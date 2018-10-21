_ = require 'lodash'

WithServerQuery =
  createServerQuery: (spec) ->
    if not spec.query?
      throw new Error('You must pass a query method')

    if not spec.fetchIfNeeded?
      throw new Error('You must pass a fetchIfNeeded method')

    db = this

    class ServerQuery
      constructor: (args) ->
        @args = args

      observe: ->
        @fetchIfNeeded()
        rv = db.observe =>
          @query()
        return rv.subscribe @fetchIfNeeded.bind(this)

    _.mixin ServerQuery.prototype, spec

    return (args) ->
      serverQuery = new ServerQuery(args)
      return serverQuery.observe()

module.exports = WithServerQuery
