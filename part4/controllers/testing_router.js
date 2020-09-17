const router = require('express').Router()
const Blog = require('./bloglist')
const User = require('./user')

router.post('/reset', async (req, res) => {
    await Blog.deleteMany()
    await User.deleteMany()

    res.status(204).end()
})

module.exports = router