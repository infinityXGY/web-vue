//导入数据库
const db = require('../db/index')

//导入bcryptjs
const bcryptjs = require('bcryptjs')

//注册
exports.regUser = (req, res) => {
    const userinfo = req.body

    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({status: 1, message: '用户名或密码不合法！'})
    // }

    //定义sql语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            //return res.send({status: 1, message: err.message})
            return res.cc(err)
        }
        //判断是否被占用
        if (results.length > 0) {
            return res.send({status: 1, message: '用户名被占用，请更换其他用户名！'})
        }
    })

    //加密密码
    userinfo.password = bcryptjs.hashSync(userinfo.password, 10)
    //console.log(userinfo)

    //添加新用户
    const sql = 'insert into ev_users set ?'
    db.query(sql, {username: userinfo.username, password: userinfo.password}, function (err, results) {
        //执行sQL语句失败
        if (err) {
            //return res.send({status: 1, message: err.message}) // SQL语句执行成功，但影响行数不为1
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.send({status: 1, message: '注册用户失败，请稍后再试!'})
        }
        //注册成功
        res.send({status: 0, message: '注册成功!'})

    })
}


//登录
exports.login = (req, res) => {
    res.send('login OK')
}