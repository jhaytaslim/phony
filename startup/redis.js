const { createClient } = require('redis')

const redisOption = {
  EX: 14400,
  NX: true
}

const client = createClient()
;(async () => {
  client.on('error', err => console.log('Redis Client Error', err))

  await client.connect()

  await set({ key:"1", value: "from" })
  await set({ key:"2", value: "from2" })

  // const one = await get("1")
  // console.log('one: ', one)

  // const all = await getAll("1")
  // console.log('all: ', all)
})()


const set = async (item = { key, value }) => {
  await client.set(item.key, JSON.stringify(item.value), redisOption)
  // await client.hSet(item.key, item.value, redisOption)
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
