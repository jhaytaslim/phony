const express = require('express')
const app = express()
const cors = require('cors')
const error = require('../middlewares/error')
const endpointNotFound = require('../middlewares/404')

const inbound = require('../routes/inbound')
const outbound = require('../routes/outbound')

const { Auth, TempAuth } = require('../middlewares/auth')
const { ThrowError, JsonResponse } = require('../lib/apiResponse')
const controller = require('../controllers')

const corsOptions = {
  origin: '*',
  exposedHeaders: ['x-auth-token']
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '100mb', extended: true }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use(express.static('public'))
// app.use(fileUpload({}))


// routing endpoint for all services
app.all(`*`, Auth, async (req, res, next) => next())

app.get(`/`, (req,res,next)=>{
  res.send("Welcome Alive!!")
  return;
})


app.post(`/inbound/sms`, controller.sms.inbound)
app.post(`/outbound/sms`, controller.sms.outbound)

// app.use('/inbound', inbound)
// app.use(`/outbound`, outbound)
// app.use('/birds', (req,res,next)=>{
//   res.send('birds')
// })

app.use(error)
app.use(endpointNotFound)

module.exports = app
