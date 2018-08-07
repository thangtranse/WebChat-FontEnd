var Random = require("./random");

var prepareTest = function (test) {
  test.isTrue = test.ok;
  test.isFalse = function (v, m) {
    return test.ok(!v, m);
  };
};

exports['test random'] = function (test) {
  prepareTest(test);
  // Deterministic with a specified seed, which should generate the
  // same sequence in all environments.
  //
  // For repeatable unit test failures using deterministic random
  // number sequences it's fine if a new Meteor release changes the
  // algorithm being used and it starts generating a different
  // sequence for a seed, as long as the sequence is consistent for
  // a particular release.
  var random = Random.createWithSeeds(0);
  test.equal(random.id(), "cp9hWvhg8GSvuZ9os");
  test.equal(random.id(), "3f3k6Xo7rrHCifQhR");
  test.equal(random.id(), "shxDnjWWmnKPEoLhM");
  test.equal(random.id(), "6QTjB8C5SEqhmz4ni");
};

// node crypto and window.crypto.getRandomValues() don't let us specify a seed,
// but at least test that the output is in the right format.
exports['test random - format'] = function (test) {
  prepareTest(test);
  var idLen = 17;
  test.equal(Random.id().length, idLen);
  test.equal(Random.id(29).length, 29);
  var numDigits = 9;
  var hexStr = Random.hexString(numDigits);
  test.equal(hexStr.length, numDigits);
  parseInt(hexStr, 16); // should not throw
  var frac = Random.fraction();
  test.isTrue(frac < 1.0);
  test.isTrue(frac >= 0.0);

  test.equal(Random.secret().length, 43);
  test.equal(Random.secret(13).length, 13);
};

exports['test random - Alea is last resort'] = function (test) {
  prepareTest(test);
  if (process) {
    test.isTrue(Random.alea === undefined);
  }
  if (typeof window !== "undefined") {
    var useGetRandomValues = !!(typeof window !== "undefined" &&
        window.crypto && window.crypto.getRandomValues);
    test.equal(Random.alea === undefined, useGetRandomValues);
  }
};

exports['test random - createWithSeeds requires parameters'] = function (test) {
  prepareTest(test);
  test.throws(function () {
    Random.createWithSeeds();
  });
};

console.log(exports);
if (module == require.main) require('test').run(exports);