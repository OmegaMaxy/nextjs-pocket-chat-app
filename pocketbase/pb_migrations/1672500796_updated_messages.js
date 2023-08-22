migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zqcakav4r73bgek")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j9wo7xgt",
    "name": "isDeleted",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zqcakav4r73bgek")

  // remove
  collection.schema.removeField("j9wo7xgt")

  return dao.saveCollection(collection)
})
