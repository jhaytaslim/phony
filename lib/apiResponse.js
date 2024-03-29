const { MSG_TYPES } = require("../constant/types");

function JsonResponse(res, status, msg, error, data = null, meta = null) {
  const body = {
    msg: "",
    error,
    // data: null,
    meta: {
      total: 1,
      pagination: {
        pageSize: 1,
        page: 1,
        // currentPage: 1,
      },
    },
  };

  if (data) {
    body.data = data;
  }
  if (!error) {
    body.error = "";
  }
  if (meta) {
    body.meta = meta;
  } else {
    delete body.meta;
  }
  
  if (typeof msg === "string") {
    const data = MSG_TYPES[msg];
    if (typeof data !== "undefined") {
      body.msg = MSG_ERRORS[msg];
    } else {
      body.msg = msg;
    }
  }
  res.status(status ?? 200).send(body);
  return;
}

function SocketResponse(error, msg, data=null, meta=null) {
  return { error, msg, data, meta };
}

module.exports = {
  JsonResponse,
  SocketResponse,
};
