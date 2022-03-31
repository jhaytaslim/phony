const supertest = require('supertest')
const app = require("../../startup/routes");
const {client} = require('../../startup/redis');

function cleanup() {
    client.quit(function() {
        console.log('Redis client stopped.');
        server.stop(function() {
            console.log('Server stopped.');
            process.exit();
        });
    });
};

let request = null
let server = null

beforeAll(function(done){
  server = app.listen(done)
  request = supertest.agent(server)
})

afterAll(function(done){
  cleanup(done)
  server.close(done)
})


describe('Post Endpoints', () => {
  it('should confirm app is able to start', async () => {
    // jest.setTimeout(30000);
    const res = await request
      .get('/');
    expect(res.statusCode).toEqual(200)
    console.log(res.text)
    expect(res.text).toEqual('Welcome Alive!')
    
  })
})

describe('Post Endpoints', () => {
  it('should confirm inbound is not accessible without basic auth with 403', async () => {
    const res = await request
      .post('/inbound/sms');
    expect(res.statusCode).toEqual(403)
    console.log(res.body)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toEqual('Access Denied')
    
  })
})

describe('Post Endpoints', () => {
  it('should confirm inbound is accessible with basic auth with 400 status ', async () => {
    const auth = "Basic " + new Buffer.from("oyinmomo" + ":" + "password1").toString("base64");

    const res = await request
      .post('/inbound/sms')
      .set('Authorization', auth);
    expect(res.statusCode).toEqual(400)
    console.log(res.body)
    expect(res.body).toHaveProperty('error')
    expect(res.body.msg).toEqual('')
    
  })
})