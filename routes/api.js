const express = require('express')
const dbClient = require('../models/db')
var router = express.Router()

// how to use database
router.get('/its_show_time', function (req, res) {
    var userId = req.query.user_id
    var obj = { user_id: 2333 }
    dbClient.db('NanoCoreTest')
        .collection('submit')
        .insertOne(obj, function (err, result) {
            if (err) return console.log(err)
            console.log('Have been saved to database.')
        })
    res.send(`userId is ${userId}.`)
})

router.post('/new_user', function (req, res) {
    var userData = req.body
    console.log(userData)
    res.redirect('/')
})

module.exports = router