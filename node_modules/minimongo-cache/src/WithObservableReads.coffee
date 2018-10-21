NullTransaction = require './NullTransaction'

_ = require 'lodash'

class ReadTransaction extends NullTransaction
  constructor: ->
    @dirtyIds = {}
    @dirtyScans = {}
    @log = []

  _extractFragment: (doc) ->
    if not doc
      return null

    return {
      _id: doc._id,
      _version: doc._version,
    }

  get: (collectionName, result, _id) ->
    @dirtyIds[collectionName] = @dirtyIds[collectionName] || {}
    @dirtyIds[collectionName][_id] = true
    @log.push @_extractFragment(result)
    return result

  find: (collectionName, result) ->
    @dirtyScans[collectionName] = true
    @log.push result.map(@_extractFragment)
    return result

  findOne: (collectionName, result) ->
    @dirtyScans[collectionName] = true
    @log.push @_extractFragment(result)
    return result

  canPushTransaction: -> false


class ObservableRead
  constructor: (db, func, context) ->
    @db = db
    @func = func
    @context = context
    @lastReadTransaction = null
    @lastValue = null
    @subscribers = []
    @changeListener = @changeListener.bind(this)
    @db.on 'change', @changeListener
    @rerunTransaction()

  subscribe: (cb) ->
    @subscribers.push cb
    cb @lastValue
    return this

  dispose: ->
    @db.removeListener 'change', @changeListener

  rerunTransaction: ->
    nextReadTransaction = new ReadTransaction()
    value = @db.withTransaction nextReadTransaction, @func, @context

    # If we read different data this time, notify of a change. This saves render() time
    if !@lastReadTransaction or !_.isEqual(@lastReadTransaction.log, nextReadTransaction.log)
      @lastReadTransaction = nextReadTransaction
      prevValue = @lastValue
      @lastValue = value
      @subscribers.forEach ((cb) ->
        cb @lastValue, prevValue # pass the old value for diffing purposes
        return
      ), this

  changeListener: (changeRecords) ->
    # If none of the data we read last time changed, don't rerun the transaction. This
    # saves query time.
    # Have we run the query before?
    if !@lastReadTransaction
      @rerunTransaction()
      return

    for collectionName of changeRecords
      # Did we scan the collection?
      if @lastReadTransaction.dirtyScans[collectionName]
        @rerunTransaction()
        return

      dirtyIdsForCollection = @lastReadTransaction.dirtyIds[collectionName] or {}
      # Did we change this particular ID? (fine-grained for gets)
      documentFragments = changeRecords[collectionName]
      i = 0
      while i < documentFragments.length
        documentFragment = documentFragments[i]
        if dirtyIdsForCollection[documentFragment._id]
          @rerunTransaction()
          return
        i++

WithObservableReads =
  observe: (func, context) -> new ObservableRead(this, func, context)

module.exports = WithObservableReads
