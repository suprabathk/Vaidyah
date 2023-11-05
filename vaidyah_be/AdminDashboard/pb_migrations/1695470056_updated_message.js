/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxqnz0glpfiubyy")

  collection.listRule = "@request.auth.id = user"
  collection.viewRule = "@request.auth.id = user"
  collection.createRule = "@request.auth.id = user"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxqnz0glpfiubyy")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
})
