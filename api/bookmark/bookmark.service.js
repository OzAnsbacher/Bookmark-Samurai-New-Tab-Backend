const dbService = require("../../services/db.service")
const ObjectId = require("mongodb").ObjectId

async function remove(bookmarkId) {
  const collection = await dbService.getCollection("bookmark")
  await collection.deleteOne({ _id: ObjectId(bookmarkId) })
  return bookmarkId
}

async function add(bookmark) {
  const collection = await dbService.getCollection("bookmark")
  const { ops } = await collection.insertOne(bookmark)
  return ops[0]
}
async function update(bookmark) {
  var id = ObjectId(bookmark._id)
  delete bookmark._id
  const collection = await dbService.getCollection("bookmark")
  await collection.updateOne({ _id: id }, { $set: { ...bookmark } })
  bookmark._id = id
  return bookmark
}

module.exports = {
  remove,
  add,
  update,
}
