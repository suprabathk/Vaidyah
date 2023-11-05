/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxqnz0glpfiubyy")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "user = @request.auth.id"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ylqmc6fn",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxqnz0glpfiubyy")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ylqmc6fn",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
