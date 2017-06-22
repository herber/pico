# pico

[![Supported by bytes](http://art.bytes.gq/badge.svg)](https://bytes.gq)

> A simple &amp; fast http abstraction

## Install

```
$ npm install --save pico-http
```

## Usage
### Requests
```js
const pico = require('pico-http');

// Middleware
pico.use((req, res, next) => {
  console.log(req.method + ' ' + req.url + ' on ' + new Date());

  next();
});

// Serve get requests to `/`
pico.get('/', (req, res) => {
  // Set contenttype
  res.contentType('text/html');
  
  // Send response
  res.send('Hello World');
});

// Serve post requests to `/api`
pico.post('/api', (req, res) => {
  const o = {
    user: 'test'
  };
  
  res.contentType('application/json');
  
  res.send(JSON.stringify(o));
});

// Catch every unhandled request
pico.serve('/*', '_', (req, res) => {
  res.status(404);

  res.send('Custom 404');
});

// Listen to port
pico.listen(3000);
```

## API
### listen(port)
Listen to http requests on port

#### port
Type: `number`

The port to listen to

### use(cb)
Add middleware. Middleware will be executed on every request before specific route handling

#### cb
Type: `function`

Will be executed on request
##### Parameters:
- req <br> Type: `object` <br> Contains information about request

- res <br> Type: `object` <br> Use `res.send()` to send something back to the client

- next <br> Type: `function` <br> Will execute the next request handler

### serve(route, method, cb)
#### route
Type: `string` or `regexp`

Allowed route

#### method 
Type: `string`

Http route(eg. `GET`, `POST`)

#### cb
Type: `function`

Parameters: `req`, `res`

Will be executed if `route` and `method` match


## License

MIT © [Tobias Herber](https://tobihrbr.com)