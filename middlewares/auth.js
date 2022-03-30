const { JsonResponse } = require("../lib/apiResponse")

const Auth = async (req, res, next) => {
  try {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':')

      console.log("user: ", [login, password])
    req.user = login
    req.password = password

    //verify user
    if(login.length < 6 || password.length < 6){
        return JsonResponse(res, 403, "Access Denied")
    }
    
    next()
  } catch (ex) {
    console.log(ex)
    if (ex.msg) {
      return JsonResponse(res, 403, ex.msg)
    }
    return JsonResponse(res, 406, 'Session Expired')
  }
}

module.exports = {
  Auth
}
