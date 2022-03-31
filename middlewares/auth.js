const { JsonResponse } = require('../lib/apiResponse')
const Services = require('../services')
const Auth = async (req, res, next) => {
  try {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':')

    console.log('user: ', [login, password])

    if(req.url === "/") return next()

    if (!login || !password) return JsonResponse(res, 403,null, 'Access Denied')

    const services = new Services()
    const user = await services.validateUser(login, password)
    
    if (!user) return JsonResponse(res, 401,null, 'Unautorized access')

    //verify user
    if (login.length < 6 || password.length < 6) {
      return JsonResponse(res, 403,null, 'Access Denied')
    }
    req.user = user
    req.password = password
    req.username = login
    req.accountId = user?.id

    next()
  } catch (ex) {
    console.log(ex)
    if (ex.msg) {
      return JsonResponse(res, 403,null, ex.msg)
    }
    return JsonResponse(res, 406, null, 'Session Expired')
  }
}

module.exports = {
  Auth
}
