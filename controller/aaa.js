// const fs = require('fs')
const { Op } = require("sequelize")
const md5 = require('md5')
const UserModel = require('../models/user')
const validateEmail = require('../utils/validate_email')
const stringRandom = require('string-random')
const randomAvatar = require('../utils/randomAvatar')

// 登录验证
const checkSession = function (ctx) {
  if (!ctx.session.userInfo) {
    ctx.body = {
      code: 401,
      message: 'Unauthorized !!! Sign In First'
    }
  } else {
    next()
  }
}

// response function
const resp = function (ctx, code, message, userInfo = {}) {
  // session
  if (code === 200) {
    ctx.session.userInfo = userInfo
    delete userInfo.password 
    ctx.body = { code, message, userInfo }
    return
  }
  ctx.body = { code, message }
}

// 登录 model
const postSignIn = async (ctx) => {
  const { email, password } = ctx.request.body

  // 邮箱格式不正确
  if (!validateEmail(email)) { resp(ctx, 400, 'email illegal !'); return }
  // 邮箱 密码 验证
  await UserModel.findOne({ where: { email }}).then(res => {
    // 邮箱不存在
    if (!res) { resp(ctx, 401, 'this email does not exist!'); return }
    // 密码验证
    res.dataValues.password === md5(password)
      ? resp(ctx, 200, 'sign in success!!', res.dataValues)
      : resp(ctx, 401, 'wrong password!!')
  }).catch(err => {
    resp(ctx, 500, 'serve error!!!')
    console.log(err)
  })
}
// 注册 model
const postSignUp = async (ctx) => {
  console.log(ctx.app)
  const { email, password } = ctx.request.body
  // 初始化随机用户名
  const username = stringRandom(12)

  // 邮箱格式不正确
  if (!validateEmail(email)) { resp(ctx, 400, 'email illegal !'); return }

  await UserModel.findOne({ where: { email } }).then(async res => {
    // email 验证
    if (res) { resp(ctx, 401, 'this email already exists!'); return }
    // 注册
    await UserModel.create({ email, username,
      password: md5(password),
      avatar: `http://127.0.0.1:${ctx.config.port}/images/${randomAvatar}.png`,
      timestamp: new Date().toLocaleString()
    }).then(res => {
      res && res.dataValues
      ? resp(ctx, 200, 'sign up success !!', res.dataValues)
      : resp(ctx, 400, 'sign up has failed !!')
    }).catch(err => {
      // stringRandom 不是唯一随机字符串
      resp(ctx, 500, 'serve create entry error!!! reSign Up again')
      console.log(err)
    })
  }).catch(err => {
    resp(ctx, 500, 'serve select entry error!!!')
    console.log(err)
  })
}

module.exports = {
  postSignIn,
  postSignUp
}


// table friend:
//   a, b,
//   msgs: [
//     {from, to, msg, time},      // order by time reverse
//     {...}
//   ]

// table group root:
//   a, b, c, ...
//   msgs: [
//     {from, msg, time}
//   ]


