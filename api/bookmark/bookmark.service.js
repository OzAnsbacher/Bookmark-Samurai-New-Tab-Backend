const dbService = require("../../services/db.service")
const utilService = require("../../services/utilService.js")
const ObjectId = require("mongodb").ObjectId

async function query(filterBy) {
  const criteria = _buildCriteria(filterBy)
  const sortCriteria = _buildSortCriteria(filterBy)
  const collection = await dbService.getCollection("bookmark")
  // var bookmarks = await collection.find(criteria).toArray();
  var bookmarks = await collection.find("").sort(sortCriteria).toArray()
  // return collection
  return bookmarks;
}

async function getById(bookmarkId) {
  const collection = await dbService.getCollection("bookmark")
  const bookmark = collection.findOne({ _id: ObjectId(bookmarkId) })
  return bookmark
}

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

async function addReview(review, bookmarkId) {
  try {
    const collection = await dbService.getCollection("bookmark")
    review.id = utilService.makeId()
    review.createdAt = Date.now()
    await collection.updateOne(
      { _id: ObjectId(bookmarkId) },
      { $push: { reviews: review } }
    )
    return review
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addMsg(bookmarkId, msg) {
  const bookmark = await getById(bookmarkId)
  bookmark.msgs = bookmark.msgs || []
  bookmark.msgs.push(msg)
  update(bookmark)
}

function _buildCriteria(filterBy) {
  const { category, populary, min, max, time } = filterBy
  const criteria = {}
  console.log("filterBy", filterBy)
  if (category) {
    const txtCriteria = { $regex: category, $options: "i" }
    criteria.category = txtCriteria
  }
  if (min) {
    criteria.price = { $gte: parseInt(min) }
  }
  if (max) {
    criteria.price = { $lte: parseInt(max) }
  }
  if (time) {
    criteria.daysToMake = { $lte: parseInt(time) }
  }
  if (populary) {
    criteria["owner.rate"] = { $gte: parseInt(populary) }
  }

  return criteria
}

function _buildSortCriteria({ sort = "" }) {
  let criteria = {}
  if (sort === "price") {
    criteria.price = 1
  } else if (sort === "title") {
    criteria.title = 1
  } else if (sort === "name") {
    criteria.owner.fullname = 1
  }

  return criteria
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  addReview,
  addMsg,
}
