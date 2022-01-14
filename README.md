# Koa2
- koa 是一个包含一组中间件函数的对象
- 类似堆栈的洋葱模型，进行组织和访问
- async、next

## koa-body
```js
// 表单提交的对象需要用 bodyParser 解析
app.use(koaBody({
  "formLimit":"5mb",
  "jsonLimit":"5mb",
  "textLimit":"5mb"
}))
```
1. reques payload
```js
headers: { 'Content-Type': 'application/json' }
```

2. formData
```js
headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
```

## session
```js
const session = require('koa-session')
// session 配置
const SESSION_CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) cookie 的Name */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000, /** cookie 的过期时间 */
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
app.keys = ['tanln'] // 加密密钥
app.use(session(SESSION_CONFIG, app));
```

- 返回一个 `session-id` 给客户端，并保存在浏览器 cookies
```json
{
  "key": "koa:sess",
  "value": "eyJ1c2VySW5mbyI6eyJpZCI6MTAwMTAsImVtYWlsIjoiMTIzQDE2My5jb20iLCJ1c2VybmFtZSI6IjZPaTdWeHIwUWhjaSIsImF2YXRhciI6Imh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9pbWFnZXMvMTIucG5nLnBuZyIsInRpbWVzdGFtcCI6IjIwMjItMDEtMTBUMDk6MjE6MDkuMDAwWiJ9LCJfZXhwaXJlIjoxNjQxODkyODY5NDYwLCJfbWF4QWdlIjo4NjQwMDAwMH0=",
  "expires": "2022xxxxx",
  "size": 284
}

```
- 客户端向服务器再次请求时，携带 `session-id`，可以用于验证身份


## 跨域 cors
```js
const cors = require('koa2-cors')
app.use(cors({
  origin: 'http://localhost:8080',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content=Type', 'Authorization', 'Accept']
}))
```

## Sequelize
- Sequelize 是一个基于 promise 的 nodejs OEM 框架，支持对 mysql 等简单关系型数据库源
- 通过映射数据库条目到对象，或者对象到数据库，对数据库增删改查


## socket.io

## 端口冲突问题
另行配置
```js
let server = require('http').createServer(app)
server.listen(1234)
// ws
let io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  allowEIO3: true
})

io.on("connection", socket => {
  // either with send()
  socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});
```