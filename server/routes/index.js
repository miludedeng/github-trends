const router = require('koa-router')()

const trends = require('../api/trends.js')

router.get('/api/:lang', trends.getData)

module.exports = router
