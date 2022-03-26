// 登录 model
// temp avatar
const randomAvatar = function () {
  const fs = require('fs')
  let imagesNameArr = fs.readdirSync(__dirname + '/../static/images/avatar')
  let index = Math.floor(Math.random() * imagesNameArr.length + 1) - 1
  return imagesNameArr[index]
}

const getRootGroup = async (ctx) => {
  ctx.body = {
    code: 200,
    message: 'get root group'
  }
}

const getAllContacts = async (ctx) => {
  ctx.body = {
    code: 200,
    data: {
      list: {
        'A': [
          {
            name: '爱丽丝',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: true
          },
          {
            name: '二月',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: true
          }
        ],
        'C': [
          {
            name: '坏东C',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/c.jpg`,
            online: false
          }
        ],
        'D': [
          {
            name: '董小姐',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: true
          }
        ],
        'E': [
          {
            name: '一僧不是医生',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: true
          }
        ],
        'G': [
          {
            name: 'ggb',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: false
          },
          {
            name: '寄了',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: false
          },
          {
            name: '顾氏',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: false
          },
          {
            name: '瓜皮',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: false
          }
        ],
        'L': [
          {
            name: 'Louis',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: true
          }
        ],
        'N': [
          {
            name: '哪呀',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: true
          }
        ],
        'T': [
          {
            name: '天国',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: false
          },
          {
            name: '图腾',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: true
          },
          {
            name: '铁掌水上漂',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: false
          }
        ],
        'Y': [
          {
            name: '杨超越',
            avatar: `http://127.0.0.1:${ctx.config.port}/images/avatar/${randomAvatar()}`,
            online: true
          }
        ]
      }
    }
  }
}

module.exports = {
  getRootGroup,
  getAllContacts
}
