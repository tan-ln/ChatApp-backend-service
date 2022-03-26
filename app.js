const Koa = require('koa')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const session = require('koa-session2')
const static = require('koa-static')
const path = require('path')
const Store = require('./store')
const app = new Koa()
let server = require('http').createServer(app)
// ws port
server.listen(1234)
// ws config
let io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  allowEIO3: true
})

app.context.config = require('./config')

app.use(cors({
  origin: 'http://localhost:8080',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content=Type', 'Authorization', 'Accept']
}))

// 表单提交的对象需要用 bodyParser 解析
app.use(koaBody({
  "formLimit":"5mb",
  "jsonLimit":"5mb",
  "textLimit":"5mb"
}))

// session 配置
const SESSION_CONFIG = {
  key: 'koa:sess',
  maxAge: 3600000,
  autoCommit: true,
  store: new Store()
}
app.keys = ['tanln'] // 加密密钥
app.use(session(SESSION_CONFIG, app));

// 配置静态资源
const staticPath = './static'
app.use(static(
  path.join(__dirname, staticPath)
))

// 登录拦截
app.use(async (ctx, next) => {
  // console.log(ctx.cookies.get('koa:sess'), ctx.path)
  if(!ctx.cookies.get('koa:sess') && ctx.path !== '/user/signin' && ctx.path !== '/user/signup') {
    ctx.body = {
      code: 401,
      message: 'Unauthorized !!! Sign In First'
    }
    console.log('Unauthorized')
  } else {
    await next()
  }
})

const withRouter = require('./routes')
withRouter(app)

app.use(async (ctx) => {
  ctx.body = {
    code: 404,
    message: 'path not found'
  }
})

// socket
const registerUserHandlers = require('./socket/userHandler')
const registerMsgHandlers = require('./socket/msgHandler')

const onConnection = socket => {
  console.log('connect : ' + socket.id)
  registerMsgHandlers(io, socket)
  registerUserHandlers(io, socket)

  // 断开连接
  socket.on('disconnect', () => {
    console.log('disconnect: ' + socket.id)
  })
}

io.on('connection', onConnection)

// 内部错误处理
app.on('error', function(err, ctx) {
  console.log('server error', err, ctx)
})

app.listen(app.context.config.port)
console.log(`listening on port ${app.context.config.port}`)
