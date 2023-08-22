migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zqcakav4r73bgek")

  collection.updateRule = "@request.data.id = null || @request.data.id = id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zqcakav4r73bgek")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
