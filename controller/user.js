// const fs = require('fs')
const md5 = require('md5')
const UserModel = require('../models/user')
const validateEmail = require('../utils/validate_email')
const stringRandom = require('string-random')
const { randomAvatar } = require('../utils/randomAvatar')
const delayer = require('../utils/index')
const { getGroupInfo } = require('./group')

// response function
const resp = async function (ctx, code, message, userInfo = {}) {
  if (code === 200) {
    // session
    ctx.session.userInfo = userInfo
    delete userInfo.password
    // delay
    await delayer(2000)
    ctx.body = { code, message, userInfo }
  } else {
    await delayer(2000)
    ctx.body = { code, message }
  }
}

// 登录 model
const postSignIn = async (ctx) => {
  const { email, password } = ctx.request.body
  // 邮箱格式不正确
  if (!validateEmail(email)) { await resp(ctx, 400, 'email illegal !'); return }
  // 邮箱 密码 验证
  await UserModel.findOne({ where: { email }}).then(async res => {
    // 邮箱不存在
    if (!res) { await resp(ctx, 401, 'this email does not exist!'); return }
    // 密码验证
    res.dataValues.password === md5(password)
      ? await resp(ctx, 200, 'sign in success!!', res.dataValues)
      : await resp(ctx, 401, 'wrong password!!')
      // ? await signUpOK(ctx, 'sign in success!!', res.dataValues)
  }).catch(async err => {
    await resp(ctx, 500, 'serve error!!!')
    console.log(err)
  })
}
// 注册 model
const postSignUp = async (ctx) => {
  const { email, password } = ctx.request.body
  // 邮箱格式不正确
  if (!validateEmail(email)) { await resp(ctx, 400, 'email illegal !'); return }
  // 初始化随机用户名
  const username = stringRandom(16)
  const uid = username
  await UserModel.findOne({ where: { email } }).then(async res => {
    // email 验证
    if (res) { await resp(ctx, 401, 'this email already exists!'); return }
    // 注册
    await UserModel.create({ uid, email, username,
      password: md5(password),
      avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/222/${randomAvatar()}`,
      groups: "['root']",
      timestamp: new Date().toLocaleString()
    }).then(async res => {
      res && res.dataValues
        ? await resp(ctx, 200, 'sign up success!!', res.dataValues)
        : await resp(ctx, 400, 'sign up has failed !!')
      // ? await signUpOK(ctx, 'sign up success !!', res.dataValues)
    }).catch(async err => {
      // stringRandom 不是唯一随机字符串
      await resp(ctx, 500, 'serve create entry error!!! try again')
      console.log(err)
    })
  }).catch(async err => {
    await resp(ctx, 500, 'serve select entry error!!!')
    console.log(err)
  })
}

module.exports = {
  postSignIn,
  postSignUp
}
