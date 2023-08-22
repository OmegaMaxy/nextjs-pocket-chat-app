migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zqcakav4r73bgek")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9hfdhz59",
    "name": "voteCount",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zqcakav4r73bgek")

  // remove
  collection.schema.removeField("9hfdhz59")

  return dao.saveCollection(collection)
})
