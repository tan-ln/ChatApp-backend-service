const Redis = require("ioredis")
const { Store } = require("koa-session2")

class RedisStore extends Store {
  constructor() {
    super()
    this.redis = new Redis({
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      family: 4,           // 4 (IPv4) or 6 (IPv6)
      password: '',
      db: 0
    })
  }

  async get(sid, ctx) {
    // console.log('get')
    let data = await this.redis.get(`SESSION:${sid}`)
    return JSON.parse(data)
  }

  async set(session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
    // console.log('set')
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000)
    } catch (e) { }
    return sid
  }

  async get_socket (email) {
    return await this.redis.get(email)
  }

  async set_socket (email, socketId) {
    await this.redis.set(email, socketId)
  }

  async del_socket(email) {
    return await this.redis.del(email)
  }

  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`)
  }
}

module.exports = RedisStore
