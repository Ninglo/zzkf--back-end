const express = require('express')
const router = express.Router()

// Developing
router.get(
    '/signup',
    function (req, res)
    {
        console.log(__dirname)
        res.sendFile(`${process.cwd()}/html/signup.html`)
    }
)

router.get(
    '/',
    function (req, res, next)
    {
        res.render(
            'doctors',
            {
                title: 'Hello, World.',
                name: 'JiaNian Jiu'
            }
        )
    }
)

module.exports = router