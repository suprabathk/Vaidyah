/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k9iivh9c2hab3bm")

  collection.createRule = null
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k9iivh9c2hab3bm")

  collection.createRule = ""
  collection.updateRule = null

  return dao.saveCollection(collection)
})
