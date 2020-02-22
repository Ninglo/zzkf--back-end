const express = require('express')
const dbClient = require('../models/db')
var router = express.Router()

// 用户输入用户名，根据用户名返回该用户具体信息，若不存在则返回400
router.get("/get/user_info", function(req, res)
{
    dbClient.db("NanoCoreTest")
            .collection("submit")
            .findOne({"user_name":req.query.user_name}, function(err, result)
            {               
                if (err) return console.log (err)   // 这句似乎没用？
                var json = {}
                var statusCode = 200
                if (result!=null)       // 如果不存在用户，则result结果为空
                {
                    json={
                        "statusCode":statusCode, 
                        "id":result._id,   // 作为标识符的id
                        "user_name":result.user_name,
                        "gender":result.gender,
                        "disease":result.disease
                         }
                }
                else
                {
                    statusCode = 400        // 表示没有此用户
                    json={
                        "statusCode":statusCode
                         }
                }                   
                console.log(json)    
                res.send(json)
            })
})

// 用户上传数据，若已存在则返回300，不予上传
router.post('/post/user_info', function(req, res) 
{   
    var statusCode = 200
    var obj = 
    {
        "user_name":req.body.user_name,      
        "gender":req.body.gender,
        "disease":req.body.disease
    }

    dbClient.db("NanoCoreTest")
            .collection("submit")
            .findOne({"user_name":req.body.user_name}, function(err, resultFind)     // 用findOne确定该用户是否存在
            {
                if (err) return console.log(err)    
                if (resultFind!=null)
                {
                    statusCode = 300        // 表示此用户已存在,不进行插入
                    console.log({"statusCode":statusCode})
                    res.send("此用户已存在！")
                }
                else
                {
                    dbClient.db("NanoCoreTest")
                            .collection("submit")
                            .insertOne(obj, function(err, resultInsert)
                            {
                                if (err) return console.log(err)
                                console.log({"statusCode":statusCode})
                                res.send("上传成功！")
                            })
                }
            })
})
    
module.exports = router