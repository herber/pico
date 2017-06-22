# pico

[![Supported by bytes](http://art.bytes.gq/badge.svg)](https://bytes.gq) [![Coverage Status](https://coveralls.io/repos/github/tobihrbr/pico/badge.svg?branch=master)](https://coveralls.io/github/tobihrbr/pico?branch=master) [![Build Status](https://travis-ci.org/tobihrbr/pico.svg?branch=master)](https://travis-ci.org/tobihrbr/pico) [![Build status](https://ci.appveyor.com/api/projects/status/f5tb1gt3ci231n4l?svg=true)](https://ci.appveyor.com/project/tobihrbr/pico)

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

The port that should be used.

### use(cb)
Add middleware. Middleware will be executed on every request before specific route handling

#### cb
Type: `function`

Will be executed on request
##### Parameters:
- req <br> Type: `object` <br> Contains request information

- res <br> Type: `object` <br> Use `res.send()` to send something back to the client

- next <br> Type: `function` <br> Execute next middleware / request handler

### serve(route, method, cb)
#### route
Type: `string` or `regexp`

Allowed route

#### method
Type: `string`

Http method(eg. `GET`, `POST`)

#### cb
Type: `function`

Will be executed if `route` and `method` match

##### Parameters:
- req <br> Type: `object` <br> Contains request information

- res <br> Type: `object` <br> Use `res.send()` to send something back to the client

## [Examples](https://github.com/tobihrbr/pico/tree/master/examples)

## License

MIT © [Tobias Herber](https://tobihrbr.com)
