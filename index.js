require('dotenv').config();
const app = require("./startup/routes");
const http = require("http").createServer(app);
const port = process.env.PORT ;

app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path)
  }
});
 
http.listen(port, () => {
  console.log(`Service listening on port: http://localhost:${port}`)
});
