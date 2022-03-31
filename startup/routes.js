const express = require('express')
const app = express()
const cors = require('cors')
// const fileUpload = require('express-fileupload')
const error = require('../middlewares/error')
const endpointNotFound = require('../middlewares/404')

const inbound = require('../routes/inbound')
const outbound = require('../routes/outbound')

const { Auth, TempAuth } = require('../middlewares/auth')
const { ThrowError, JsonResponse } = require('../lib/apiResponse')

const corsOptions = {
  origin: '*',
  exposedHeaders: ['x-auth-token']
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '100mb', extended: true }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use(express.static('public'))
// app.use(fileUpload({}))


process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

function cleanup() {
    client.quit(function() {
        console.log('Redis client stopped.');
        server.stop(function() {
            console.log('Server stopped.');
            process.exit();
        });
    });
};


// routing endpoint for all services
app.all(`*`, Auth, async (req, res, next) => next())

app.get(`/`, (req,res,next)=>{
  res.status(200).send("Welcome Alive!");
  return;
})

const controller = require('../controllers')
const { client } = require('./redis')
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
