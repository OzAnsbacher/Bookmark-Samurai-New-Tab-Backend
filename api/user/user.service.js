const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")
const ObjectId = require("mongodb").ObjectId

module.exports = {
  getById,
  addBookmark,
  editBookmark,
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection("user")
    const user = await collection.findOne({ _id: ObjectId(userId) })
    delete user.password
    return user
  } catch (err) {
    logger.error(`while finding user ${userId}`, err)
    throw err
  }
}

async function addBookmark(bookmark, user) {
  try {
    bookmark._id = Math.random().toString(16).slice(2)
    const collection = await dbService.getCollection("user")
    const importUser = await collection.findOne({ _id: ObjectId(user._id) })
    importUser.bookmarks.push(bookmark)
    await collection.updateOne(
      { _id: ObjectId(user._id) },
      { $set: importUser }
    )
    return importUser
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function editBookmark(editBookmark, user) {
  try {
    const collection = await dbService.getCollection("user")
    let importUser = await collection.findOne({ _id: ObjectId(user._id) })
    importUser.bookmarks = importUser.bookmarks.map((bookmark) => {
      if (bookmark?._id === editBookmark._id) {
        return editBookmark
      } else {
        return bookmark
      }
    })
    await collection.updateOne(
      { _id: ObjectId(user._id) },
      { $set: importUser }
    )
    return importUser
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}
