/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "id = @request.auth.id || @request.auth.isAdmin = true"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2mhdc7bc",
    "name": "isAdmin",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "id = @request.auth.id"

  // remove
  collection.schema.removeField("2mhdc7bc")

  return dao.saveCollection(collection)
})
