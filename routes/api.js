const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const { MongoClient } = require("mongodb")
const URI = 'mongodb://localhost:27017/'
const client = new MongoClient(URI)

var dataBase
var userInfoCollection
client.connect().then(() => {
    dataBase = client.db("zzkf")
    userInfoCollection = dataBase.collection('userInfo')
})

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// userInfo
router.get('/userInfo', (req, res) => {
    userId = req.query.userId
    console.log(`A GET request with ${userId}`)
    queryUserInfo(userId, res).catch(console.dir)
})

router.put('/userInfo', (req, res) => {
    let userInfoObj = req.body
    console.log('Put request with:')
    console.log(userInfoObj)
    updateUserInfo(userInfoObj, res).catch(console.dir)
})

// Developing
router.delete('/userInfo', (req, res) => {
    let userId = req.query.userid
    deleteUserInfo(userId, res).catch(console.dir)
})


// couseInfo
router.get('/courseInfo', (req, res) => {
    let courseId = req.query.courseid
    queryCourseInfo(courseId, res).catch(console.dir)
})

/*
router.put('/courseInfo', (req, res) => {
    let courseInfoObj = req.body
    updatecourseInfo(courseInfoObj, res).catch(console.dir)
})

router.delete('/courseInfo', (req, res) => {
    let userId = req.query.userid
    deletecourseInfo(userId, res).catch(console.dir)
})
*/

// courseList
router.get('/courseList', (req, res) => {
    queryCourseList(res)
})


async function queryUserInfo(userId, res) {
    const query = { userId: userId }
    console.log(`Begin a query with:`)
    console.log(query)

    const userInfoObj = await userInfoCollection.findOne(query)
    console.log(`Get userInfoObj.`)

    await res.send(userInfoObj)
    console.log('Send Success!')
}

async function updateUserInfo(userInfoObj, res) {
    let status = false
    const filter = { userId : userInfoObj.userId }
    const options = { upsert: true }

    await userInfoCollection.updateOne(filter, { $set: userInfoObj }, options)

    status = true
    if (status) {
        res.sendStatus(200)
        res.send('Update db finished.')
    } else {
        res.sendStatus(400)
        res.send('Update db Wrong.')
    }
}

async function deleteUserInfo(userId, res) {
    try {
        await client.connect()

        const dataBase = client.db('zzkf')
        const collection = dataBase.collection('userInfo')

        const query = { userId: userId }
        const deleteResult = await collection.deleteOne(query)

        res.send(deleteResult)
    } finally {
        await client.close()
    }
}

async function queryCourseInfo(courseId, res) {
    try {
        client.connect()

        const dataBase = client.db('zzkf')
        const collection = dataBase.collection('courseInfo')

        const query = { courseId: courseId }
        res.send(await collection.findOne(query))
    } finally {
        await client.close()
    }
}

async function queryCourseList(difficulty, res) {
    try {
        client.connect()

        const dataBase = client.db('zzkf')
        const collection = dataBase.collection('courseInfo')

        const query = { difficulty: difficulty }

        res.send(await collection.find(query))
    } finally {
        await client.close()
    }
}

module.exports = router