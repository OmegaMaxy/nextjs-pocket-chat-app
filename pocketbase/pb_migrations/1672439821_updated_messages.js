migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zqcakav4r73bgek")

  collection.updateRule = "@request.data.id = null || @request.data.id = id\n&& @request.data.text = null || @request.data.text = text\n&& @request.data.created = null || @request.data.created = created\n&& @request.data.updated = null || @request.data.updated = updated\n&& @request.data.user = null || @request.data.user = user"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zqcakav4r73bgek")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
