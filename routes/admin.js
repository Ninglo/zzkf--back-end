const express = require('express')
const path = require('path')
var router = express.Router()
var p = path.resolve(__dirname, '..')

router.get('/login', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(p + '/views/login.html', function(err) {
        if (err) {
            next(err)
        }
    })
})

router.get('/register', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(p + '/views/register.html', function(err) {
        if (err) {
            next(err)
        }
    })
})

router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(p + '/views/admin.html', function(err) {
        if (err) {
            next(err)
        }
    })
})

module.exports = router