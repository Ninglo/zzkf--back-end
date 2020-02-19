const express = require('express')
var router = express.Router()

router.post(
    '/',
    (req, res, next) =>
    {
        db.collection('quotes').save(
            req.body,
            (err, result) =>
            {
                if (err) return console.log(err)

                console.log('saved to database')
                res.redirect('/')
            }
        )
    }
)

module.exports = router