const express= require('express')
const router = express.Router()

//导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 1、导入验证表单数据的中间件
const expressJoi = require( 'express-joi')
//2．导入需要的验证规则对象
const { reg_login_schema } = require( '../schema/user')

//注册
router.post('/regUser',expressJoi(reg_login_schema),userHandler.regUser)
//登录
router.post('/login',userHandler.login)

module.exports = router