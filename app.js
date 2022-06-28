const express = require('express')

const app = express()

const joi = require('joi')

//配置cors中间件
const cors = require('cors')
app.use(cors())

//导入解析表单中间件
app.use(express.urlencoded({extend: false}))

//响应数据的中间件
app.use(function (req, res, next) {
    // status = 0为成功,status = 1为失败﹔默认将status 的值设置为1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            //状态
            status,
            //状态描述,判断err是错误对象还是字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//导入用户模块路由
const userRouter = require('./router/user')
app.use('/api', userRouter)

//错误中间件
app.use(function (err, req, res, next) {
    //数据验证失败
    if (err instanceof joi.validationError) return res.cc(err)
    //未知错误
    res.cc(err)
})


app.listen(3007, function () {
    console.log('serve running at http://127.0.0.1:3007')
})