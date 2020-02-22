const express = require('express')
const dbClient = require('../models/db')
var router = express.Router()

router.get('/', function(req, res) {
    res.render(
        'admin',
        {
        'statusCode': '200',
        'userName': '', 
        'gender': '', 
        'disease': ''
        })
})

/**
 *  /get/user_info: 查找用户功能，查找到后停留在补充了信息的admin页面。
 */
router.get('/get/user_info', function (req, res) {
    var userName = req.query.user_name
    dbClient.db('NanoCoreTest')
        .collection('submit')
        .findOne(
            {'user_name': userName},
            function(err, result) {
                if (err) return console.log(err)
                if (result == null) {
                    res.render('admin', {'statusCode': '400'})
                    return
                }
                var gender;
                var disease;
                typeof(result.gender) == "undefined" ? gender = '' : gender = result.gender
                typeof(result.disease) == "undefined" ? disease = '' : disease = result.disease 
                res.render(
                    'admin', 
                    {
                        'statusCode': '200',
                        'userName': userName, 
                        'gender': gender, 
                        'disease': disease
                    }
                )
            }
        )
})

/**
 *  /post/user_info: 向数据库中添加用户信息的功能，添加成功后跳转至提示页面。
 */
router.post('/post/user_info', function (req, res) {
    var userName = req.body.user_name
    var gender = req.body.gender                            
    var disease = req.body.disease
    console.log(userName)
    var obj = 
        {
            'user_name': userName, 
            'gender': gender,
            'disease': disease
        }
    dbClient.db('NanoCoreTest')
        .collection('submit')
        .insertOne(obj, function (err, result) {
            if (err) return console.log(err)
            console.log('Have been saved to database.')
        })
    res.send(`插入成功！ 
        userName is ${userName}, 
        gender is ${gender}, 
        disease is ${disease}.`)
})

module.exports = router