const logger = require("../services/logger.service")

async function requireAuth(req, res, next) {
   if (!req.cookies || !req.cookies.user) {
    res.status(401).end("Unauthorized!")
    return
  }
  next()
}

module.exports = {
  requireAuth,
}
