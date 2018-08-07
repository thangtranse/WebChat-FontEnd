'use strict';

function emptyFunction() {}

var WithCreateQuery = {
  createQuery: function(spec) {
    if (!spec.hasOwnProperty('read')) {
      throw new Error('spec requires a read key');
    }
    spec.fetchIfNeeded = spec.fetchIfNeeded || emptyFunction;

    function Query(db, args) {
      this.db = db;
      this.args = args;
    }

    for (var name in spec) {
      Query.prototype[name] = spec[name];
    }

    return function(args) {
      var thisObj = new Query(this, args);
      var result = thisObj.read();
      thisObj.fetchIfNeeded(this, result);

      return this.read(function(db) {
        thisObj.db = db;
        return thisObj.read(db);
      });
    }.bind(this);
  },
};

module.exports = WithCreateQuery;
