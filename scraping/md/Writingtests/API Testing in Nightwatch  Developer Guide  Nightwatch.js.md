### Overview

API testing is a type of software testing that involves testing the API layer of an application.

API testing involves testing the requests and responses between the client application and the server. This is typically done by sending HTTP requests to the API endpoints and verifying the responses returned. The main goal of API testing is to ensure that the API behaves as expected, and that it returns the correct data and errors for different input scenarios.

Overall, API testing is an important aspect of software testing that ensures the reliability and functionality of an application's API layer, enabling developers to build robust and scalable software applications.

### How does it work?

To perform API testing, the official [@nightwatch/apitesting](https://github.com/nightwatchjs/nightwatch-plugin-apitesting) plugin needs to be installed. The plugin provides the following features:

1.  Integration with [supertest](https://www.npmjs.com/package/supertest) for testing HTTP requests
2.  Built-in mock server based on [express](https://www.npmjs.com/package/express) with support for [sinon](https://www.npmjs.com/package/sinon) assertions on mocked HTTP requests

Requires Nightwatch 2.6.4 or higher.

### Installation

#### 1) Install the plugin from NPM

```
npm i @nightwatch/apitesting --save-dev
```

#### 2) Add the plugin to the list

Update the Nightwatch configuration to add the plugin to the list:

_nightwatch.conf.js_

```
module.exports = {
  plugins: ['@nightwatch/apitesting']
  
  // other Nightwatch settings...
}
```

#### 3) Disable the browser session

We also need to turn off the browser session, since we're only doing API testing. This can be accomplished by adding a new environment for API testing as shown below in nightwatch.conf.js

_nightwatch.conf.js_

```
module.exports = {
  // ....
  api_testing: {
    start_session: false,
    webdriver: {
      start_process: false,
    }
  }
}
```

### Config settings

The plugin has for now only one configuration option, which is weather or not to log the HTTP responses to the console. This can be configured in the `nightwatch.json` (or `nightwatch.conf.js`) config file:

_nightwatch.conf.js_

```
{
  "@nightwatch/apitesting" : {
    "log_responses": true
  }
}
```

Since Nightwatch use `supertest` under the hood, you can test different types of REST API headers & response.

**GET REQUEST**

_get-api-test.js_

```
describe('api testing', function () {
  it('get api test', async function({supertest}) {
    await supertest
      .request("https://petstore.swagger.io/v2")
      .get("/pet/findByStatus?status=available")
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function(response){
          expect(response._body.length).to.be.greaterThan(0);
      });
  });
});
```

**POST REQUEST**

_post-api-test.js_

```
describe('api testing', function () {
  it('post api test', async function({supertest}) {
    await supertest
      .request("https://petstore.swagger.io/v2")
      .post("/pet")
      .send({
        "id": 0,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function(response){
          expect(response._body.name).to.be.equal("doggie");
      });
  });
});
```

### Running API tests

Ensure that the API tests are run against an `environment` where the `start_session` and `webdriver -> start_process` are set to `false`.

```
npx nightwatch <path to tests> --env api_testing
```

### HTML Report

Once the tests are run, the results can be reviewed in the HTML report.

![HTML report](https://user-images.githubusercontent.com/1677755/224906440-9cc1679c-854a-44d7-81ae-e872ab396b79.png)

### Integrated mock server

The `@nightwatch/apitesting` plugin also provides a built-in mock server based on [express](https://www.npmjs.com/package/express) that can be used to assert incoming http requests.

Here's a sample mock server:

_mock-server.js_

```
describe('api testing with supertest in nightwatch POST', function () {
  
  let server;
  
  before(async function(client) {
    server = await client.mockserver.create();
    server.setup((app) => {
      app.post('/api/v1/datasets/', function (req, res) {
        res.status(200).json({
          id: 'test-dataset-id'
        });
      });
    });
    
    await server.start(3000);
  });
  
  after(() => {
    server.close();
  });
  
  it('demo test', async function(client) {
    const req = await server.request()
      .post('/api/v1/datasets/')
      .send({name: 'medea'})
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);
    
    await client.assert.deepStrictEqual(server.route.post('/api/v1/datasets/').requestBody, {name: 'medea'});
  });
  
});
```

#### Mock server API

-   `const mockServer = await client.mockserver.create()` – creates a new mock server instance
-   `await mockServer.setup(definition)` – setup an existing mock server instance with the provided route definition Example:
    
    ```
    await mockServer.setup((app) => {
        app.get('/api/v1/schemas', function (req, res) {
          console.log('GET /api/v1/schemas called');
          
          res.status(200).json([
            {
              id: 'test-schema-id1'
            },
            {
              id: 'test-schema-id2'
            }
          ]);
        })
      });
    ```
    
-   `await mockServer.start(port)` – starts an existing mock server instance on the specified port
-   `await mockServer.route(path)` – returns a [sinon spy](https://sinonjs.org/releases/latest/spies/) on the specified route

#### Assert on incoming requests

Use the `mockServer.route(path)` method to retrive a spy on the specified route. You can then use the [sinon assertions](https://sinonjs.org/releases/latest/spies/#spyanonymous) to assert on the incoming requests.

##### Example

Consider the previous mock server setup example. If we want to assert that the `GET /api/v1/schemas` route was called, we can do the following:

```
it('demo test', async function(client) {
    client
      .assert.strictEqual(mockServer.route.get('/api/v1/schemas').calledOnce, true, 'called once')
      .assert.strictEqual(mockServer.route.get('/api/v1/schemas').calledTwice, false);
  });
```

We can also assert on the request headers, for example using the built-in `expect()` assertions API which uses on [chai](https://www.chaijs.com/api/bdd/):

```
it('demo test', async function(client) {
    const {requestHeaders} = mockServer.route.get('/api/v1/schemas');
    
    client.expect(requestHeaders).to.have.property('connection', 'close');
  });
```

#### Assert on incoming post data

We can also assert on the incoming post data:

1.  First, set up a post route for the mock server:

```
await mockServer.setup((app) => {
  app.post('/api/v1/datasets/', function (req, res) {
    res.status(200).json({
      id: 'test-dataset-id'
    });
  });
});
```

2.  Then use the `mockServer.route.post(path)` method to retrive a spy on the specified route. You can then use the [sinon assertions](https://sinonjs.org/releases/latest/spies/#spyanonymous) to assert on the incoming requests.

```
it('demo test', async function(client) {
    const {requestBody} = mockServer.route.post('/api/v1/schemas');
    
    await client.assert.deepStrictEqual(requestBody, {name: 'medea'});
});
```

For waiting for incoming requests tests, you can use the [`waitUntil()`](https://nightwatchjs.org/api/waitUntil.html) command.

Example using `waitUntil`:

```
it('demo test', async function(client) {
    const timeoutMs = 15000;
    const retryIntervalMs = 500;
    
    await client.waitUntil(async function () {
      const spy = server.route.get('/api/v1/schemas');
      
      if (spy) {
        return spy.calledOnce;
      }
      
      return false;
    }, timeoutMs, retryIntervalMs, new Error(`time out reached (10000ms) while waiting for API call.`));
    
});
```