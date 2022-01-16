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
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) cookie 的Name */
  maxAge: 3600000, /** cookie 的过期时间 60*60*24*1000 = 24小时 格林威治时间 */
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  // overwrite: true, /** (boolean) can overwrite or not (default true) */
  // httpOnly: true, /** cookie是否只有服务器端可以访问 httpOnly or not (default true) */
  // signed: true, /** (boolean) signed or not (default true) */
  // rolling: false, /** 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false） */
  // renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
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
  console.log(ctx.cookies.get('koa:sess'), ctx.path)
  if(!ctx.cookies.get('koa:sess') && ctx.path !== '/user/signin' && ctx.path !== '/user/signup') {
    ctx.body = {
      code: 401,
      message: 'Unauthorized !!! Sign In First'
    }
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

// io.use((socket, next) => {
//   console.log(socket.id)
//   if (socket.id) {
//     next()
//   } else {
//     next(new Error("invalid"))
//   }
// })

const onConnection = socket => {
  registerUserHandlers(io, socket)
}

io.on('connection', onConnection)

// 内部错误处理
app.on('error', function(err, ctx) {
  console.log('server error', err, ctx)
})

app.listen(app.context.config.port)
console.log(`listening on port ${app.context.config.port}`)
