//导入joi
const joi = require('joi')
const expressJoi = require('express-joi')


//用户名的验证规则
const username = joi.string().alphanum( ).min( 1 ).max(10).required()
//密码的验证规则
const password = joi
    .string()
    .pattern(/ ^[\S]{6,12}$/)
    .required()


//定义验证呢过注册和登陆表单数据的规则对象
exports.reg_login_schema = {
    body:{
        username,password
    }
}