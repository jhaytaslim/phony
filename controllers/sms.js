const { JsonResponse } = require('../lib/apiResponse')
const Services = require('../services')
const {
  getAsync,
  setAsync,
  get,
  set,
  getAll,
  client
} = require('../startup/redis')
const { validateInbound, requireInbound } = require('../validations/sms')

module.exports = {
  /**
   * Register new Agent
   * @param {*} req
   * @param {*} res
   */
  inbound: async (req, res, next) => {
    try {
      const { error } = requireInbound(req.body)
      if (error) return JsonResponse(res, 400, '', error.details[0].message)

      const { from, to, text } = req.body
      const key = `${from}-${to}`

      const services = new Services()
      // remember
      //check if account has to
      let phones = await services.retrievePhone(req.accountId)

      if (!phones || phones.some(item => item.number === to))
        return JsonResponse(res, 400, '', '"to" parameter not found')

      // check if value is STOP and cache
      if (
        req.body.text.replace(/(\r\n|\n|\r)/gm, '').toUpperCase() === 'STOP'
      ) {
        await set({ key, value: { from, to } })
      }

      return JsonResponse(res, 200, 'inbound sms ok')
    } catch (err) {
      console.log(err)
      next(err)
      return
    }
  },

  outbound: async (req, res, next) => {
    try {
      const { error } = requireInbound(req.body)
      if (error) return JsonResponse(res, 400, '', error.details[0].message)

      const { from, to, text } = req.body
      const key = `${from}-${to}`

      //check if from/to appeared before with a STOP
      const getRes = await get(key)
      console.log('done', getRes)
      if (getRes)
        return JsonResponse(
          res,
          200,
          null,
          `sms from ${from} to ${to} blocked by STOP request`
        )

      const services = new Services()
      //check if account has to
      let phones = await services.retrievePhone(req.accountId)

      if (!phones || phones.some(item => item.number === from))
        return JsonResponse(res, 400, '', '"from" parameter not found')

      //if >= 50 outbound requests from "from" cry
      //return JsonResponse(res, 400, '', 'limit reached for from "from"')

      // check if value is STOP and cache
      if (
        req.body.text.replace(/(\r\n|\n|\r)/gm, '').toUpperCase() === 'STOP'
      ) {
        await set({ key, value: { from, to } })
      }

      return JsonResponse(res, 200, 'outbound sms ok')
    } catch (err) {
      console.log(err)
      next(err)
      return
    }
  }
}
