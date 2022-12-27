const express = require('express')
const { addBookmark, updateBookmark } = require('./bookmark.controller')
const router = express.Router()


router.post('/', addBookmark)
router.put('/:id', updateBookmark)


module.exports = router
