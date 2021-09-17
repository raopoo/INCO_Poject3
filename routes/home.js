const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/main')
})


module.exports = router