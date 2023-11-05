/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "k9iivh9c2hab3bm",
    "created": "2023-09-24 10:10:06.624Z",
    "updated": "2023-09-24 10:10:06.624Z",
    "name": "resources",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rxll3onq",
        "name": "field",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k9iivh9c2hab3bm");

  return dao.deleteCollection(collection);
})
