const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const { MongoClient } = require("mongodb")
const URI = 'mongodb://localhost:27017/'
const client = new MongoClient(URI)

const axios = require('axios')

var dataBase
var userInfoCollection
client.connect().then(() => {
    dataBase = client.db("zzkf")
    userInfoCollection = dataBase.collection('userInfo')
    courseCollection = dataBase.collection('course')
})

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// userInfo
router.get('/userInfo/:code', async (req, res) => {
    code = req.params.code
    console.log(`A GET request with ${code}`)
    const resData = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wxf0d502c6da70bdbc&secret=bf6390fd750abce0cb8d3bcb84a145d1&js_code=${code}&grant_type=authorization_code`)
    await queryUserInfo(resData, res).catch(console.dir)
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
router.get('/courseInfo/:courseId', (req, res) => {
    let courseId = req.params.courseId
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


async function queryUserInfo(resData, res) {
    const query = { openid: resData.data.openid }
    const userInfoObj = await userInfoCollection.findOne(query)
    if (!userInfoObj) {
        const newUserInfoObj = {
            openid: resData.data.openid,
            session_key: resData.data.session_key,
            courses: [],
        }
        userInfoCollection.insertOne(newUserInfoObj)
        await res.send(userInfoObj)
    } else {
        await res.send(userInfoObj)
    }
}

async function updateUserInfo(userInfoObj, res) {
    const filter = { openid : userInfoObj.openid }
    console.log(userInfoObj)
    const update = {
        $set: { courses: userInfoObj.courses }
    }
    const options = { upsert: true }

    await userInfoCollection.updateOne(filter, update, options)

    res.send('Finished.')
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
    const query = { courseId: parseInt(courseId) }
    const course = await courseCollection.findOne(query)
    res.send(course)
}

async function queryCourseList(res) {
    const fields = {
        _id: false,
        courseName: true,
        courseId: true,
        'detail.intro': true,
    }
    const courseList = await courseCollection.find({}).project(fields).toArray()
    console.log(courseList)
    res.send(courseList)
}

module.exports = router