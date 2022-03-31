const { JsonResponse } = require('../lib/apiResponse');


module.exports = function (err, req, res, next) {
  const errorMessage = "unknown failure";
  const statusCode = 500;

  console.log("err ==> ", new Date(), "<===>", err.service, "<===>", errorMessage);

  return JsonResponse(res, statusCode,null ,errorMessage);
}