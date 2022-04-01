require('dotenv').config()
const { createClient } = require('redis')

const redisOption = {
  EX: 14400,
  NX: true
}

const url = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
console.log('dfg...', process.env.REDIS_PORT, process.env.REDIS_HOST, url)
// const client = createClient({
//   port: process.env.REDIS_PORT || 12881,
//   host: process.env.REDIS_HOST || 'redis-12881.c281.us-east-1-2.ec2.cloud.redislabs.com',
//   password: process.env.REDIS_PASSWORD
// })


const client = createClient({
  url: url
})

// const client = createClient(12881, 'redis-12881.c281.us-east-1-2.ec2.cloud.redislabs.com',process.env.REDIS_PASSWORD);

// const client = createClient({
//   url: process.env.REDIS_URL,
//   socket: {
//     tls: true,
//     servername: process.env.REDIS_HOST
//   }
// })

;(async () => {
  client.on('error', err => console.log('Redis Client Error', err))

  await client.connect()

  await set({ key: 'jh', value: { from: 1, to: 2 } })

  console.log('hjhgj...', await get('jh'))
})()

const set = async (item = { key, value }) => {
  await client.set(item.key, JSON.stringify(item.value), redisOption)
}

const get = async key => {
  const value = await client.get(key)
  return JSON.parse(value)
}

getAll = async function (key) {
  const all = await client.hGetAll()
  console.log('fdfhjjg: ', all)
  return JSON.parse(all)

  // let jobs = []
  // await client.keys('*', function (err, keys) {
  //   console.log("start: ")
  //   if (err) return console.log(err)
  //   if (keys) {
  //     console.log("here: ")
  //     async.map(
  //       keys,
  //       function (key, cb) {
  //         client.get(key, function (error, value) {
  //           if (error) return cb(error)
  //           console.log("job: ",key, value)
  //           var job = {}
  //           job['key'] = key
  //           job['value'] = value
  //           cb(null, job)
  //         })
  //       },
  //       function (error, results) {
  //         if (error) return console.log(error)
  //         console.log("results: ",results)
  //         jobs = results
  //         // res.json({ data: results })
  //       }
  //     )
  //   }
  // })

  // return jobs
}

module.exports = {
  set,
  get,
  getAll,
  client
}
