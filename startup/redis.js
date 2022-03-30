const redis = require('redis')
const { promisify } = require('util')

// create redis client
// const client = redis.createClient({
// //   host: process.env.REDIS_HOST,
//   port: parseInt(process.env.REDIS_PORT),
// //   password: process.env.REDIS_PASSWORD
// })

let client
(async () => {
    try {
       client = redis.createClient({ socket: { port: 6379 } });
      await client.connect();
      console.log('connected');
    } catch (err) {
      console.error(err)
    }
  })()

// redis.js doesn't support async utils as of writing this article
// we can use the recommended workaround
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

module.exports = {
  getAsync,
  setAsync
}
