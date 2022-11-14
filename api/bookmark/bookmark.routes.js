const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getbookmarks, getbookmarkById, addbookmark, updatebookmark, removebookmark, addReview } = require('./bookmark.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.post('/', addbookmark)
router.get('/', getbookmarks)
router.get('/:id', getbookmarkById)
router.delete('/:id', removebookmark)//requireAuth, requireAdmin,
router.put('/:id', updatebookmark)
// router.delete('/:id', removebookmark)
// router.put('/:id', requireAuth, requireAdmin, updatebookmark)
// router.put('/:id', requireAuth, updatebookmark)
// router.post('/:id/review', addReview)
// router.post('/', requireAuth, requireAdmin, addbookmark)//,

module.exports = router
