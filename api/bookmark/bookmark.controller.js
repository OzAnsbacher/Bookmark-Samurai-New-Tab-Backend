const bookmarkService = require("./bookmark.service.js")
const logger = require("../../services/logger.service")
const { broadcast } = require("../../services/socket.service.js")

async function addBookmark(req, res) {
  const bookmark = req.body
  try {
    const addedbookmark = await bookmarkService.add(bookmark)
    res.json(addedbookmark)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateBookmark(req, res) {
  try {
    const bookmark = req.body
    const updatedbookmark = await bookmarkService.update(bookmark)
    res.json(updatedbookmark)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeBookmark(req, res) {
  try {
    const bookmarkId = req.params.id
    const removedId = await bookmarkService.remove(bookmarkId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}

module.exports = {
  addBookmark,
  updateBookmark,
  removeBookmark,
}
