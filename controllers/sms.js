const { JsonResponse } = require('../lib/apiResponse')
const { getAsync, setAsync } = require('../startup/redis')
const { validateInbound } = require('../validations/sms')

module.exports = {
  /**
   * Register new Agent
   * @param {*} req
   * @param {*} res
   */
  inbound: async (req, res, next) => {
    try {
      const { error } = validateInbound(req.body)
      if (error) return JsonResponse(res, 400, error.details[0].message)

      if(!req.body.to) return JsonResponse(res, 400, 'Not found')

      const {from, to, text} = req.body
      // check if value is STOP
      if(req.body.text.replace(/(\r\n|\n|\r)/gm,"").toUpperCase === "STOP"){
        
      }
      
      console.log("set")
      await setAsync(
        `${req.user}${text}`, // Key
        JSON.stringify({ from, to }), // Value
        'EX', // Set explicit expiry
        60 // TTL in seconds
      )
      console.log("get")
      const getRes = await getAsync(`${req.user}${text}`)
      console.log("done")
      if (getRes) return  JsonResponse(res, 200, 'MSG_TYPES.ACCOUNT_CREATED', { success: true, data: JSON.parse(getRes) })
      //  res.json({ success: true, data: JSON.parse(getRes) })

      // On cache-miss => query database
      // const users = await <Model>.find({});

      {
        /* // Set cache */
      }
      

      return JsonResponse(res, 200, 'MSG_TYPES.ACCOUNT_CREATED')
    } catch (err) {
      console.log(err)
      next(err)
      return
    }
  },

  outbound: async (req, res, next) => {
    try {
      //   const { error } = validateRegisterAgent(req.body)
      //   if (error) return JsonResponse(res, 400, error.details[0].message)

      return JsonResponse(res, 200, 'MSG_TYPES.ACCOUNT_CREATED')
    } catch (err) {
      console.log(err)
      next(err)
      return
    }
  }
}
