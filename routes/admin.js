const express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
    res.render(
        'admin',
        {
        'statusCode': 200,
        'userName': '', 
        'gender': '', 
        'disease': ''
        })
})

module.exports = router