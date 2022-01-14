const Koa = require('koa')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const session = require('koa-session')
const static = require('koa-static')
const path = require('path')
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
  maxAge: 86400000, /** cookie 的过期时间 60*60*24*1000 = 24小时 格林威治时间 */
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
app.keys = ['tanln'] // 加密密钥
app.use(session(SESSION_CONFIG, app));

// 配置静态资源
const staticPath = './static'
app.use(static(
  path.join(__dirname, staticPath)
))

const withRouter = require('./routes')
withRouter(app)

app.use(async (ctx) => {
  ctx.body = {
    code: 404,
    message: 'path not found'
  }
})

io.on('connection', socket => {
  // socket.on('message', (data) => {
  //   console.log(data)
  // })

  socket.emit('test', 'test msg')
})

// 内部错误处理
app.on('error', function(err, ctx) {
  console.log('server error', err, ctx)
})


app.listen(app.context.config.port)
console.log(`listening on port ${app.context.config.port}`)
