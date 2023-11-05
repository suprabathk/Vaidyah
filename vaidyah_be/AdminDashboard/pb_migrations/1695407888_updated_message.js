/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxqnz0glpfiubyy")

  collection.createRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxqnz0glpfiubyy")

  collection.createRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
})
