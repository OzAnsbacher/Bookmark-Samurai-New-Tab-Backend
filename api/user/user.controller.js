const userService = require("./user.service")
const logger = require("../../services/logger.service")

async function getUser(req, res) {
  try {
    const { _id } = req.cookies?.user
    const user = await userService.getById(_id)
    res.send(user)
  } catch (err) {
    logger.error("Failed to get users", err)
    res.status(500).send({ err: "Failed to get users" })
  }
}

async function updateUser(req, res) { 
  try {
    const bookmark = req.body
    const user = req.cookies.user
    let savedUser
    if (bookmark._id) {
      savedUser = await userService.editBookmark(bookmark, user)
    } else {
      savedUser = await userService.addBookmark(bookmark, user)
    }
    res.send(savedUser)
  } catch (err) {
    logger.error("Failed to update user", err)
    res.status(500).send({ err: "Failed to update user" })
  }
}

module.exports = {
  getUser,
  updateUser,
}
