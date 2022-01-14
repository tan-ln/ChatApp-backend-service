// const fs = require('fs')
// const { Op } = require("sequelize")
// const md5 = require('md5')
// const UserModel = require('../models/user')
// const validateEmail = require('../utils/validate_email')
// const stringRandom = require('string-random')
// const randomAvatar = require('../utils/randomAvatar')

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
const getChatMsg = async (ctx) => {
  ctx.body = {
    code: 200,
    message: 'successfully req msg list',
    msgList: [
      // form id
      // 客户端已有所有好友信息
      {
        'from': '123@qq.com',
        'to': 'tang@qq.com',
        'list': [
          {
            type: 'text',
            content: 'test message from 123@qq.com',
            timestamp: '10:23',
            read: false
          },
          {
            type: 'text',
            content: 'another message from 123@qq.com',
            timestamp: '10:24',
            read: false
          }
        ]
      },
      {
        'from': '123@163.com',
        'to': 'tang@qq.com',
        'list': [
          {
            type: 'text',
            content: 'test message from 123@163.com',
            timestamp: '10:26',
            read: false
          }
        ]
      },
      {
        'from': 'tang@qq.com',
        'to': '123@163.com',
        'list': [
          {
            type: 'text',
            content: 'test message from tang@qq.comto 123@163.com',
            timestamp: '10:66',
            read: false
          }
        ]
      }
    ]
  }
}

module.exports = {
  getChatMsg
}
