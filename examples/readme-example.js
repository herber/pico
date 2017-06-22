const pico = require('./');

// middleware
pico.use((req, res, next) => {
  console.log(req.method + ' ' + req.url + ' on ' + new Date());

  next();
});

// serve get requests to `/`
pico.get('/', (req, res) => {
  // set contenttype
  res.contentType('text/html');

  // send response
  res.send('Hello World');
});

// serve post requests to `/api`
pico.post('/api', (req, res) => {
  const o = {
    user: 'test'
  };

  res.contentType('application/json');

  res.send(JSON.stringify(o));
});

// Catch every unhandled request
pico.serve('/.*', '_', (req, res) => {
  res.status(404);

  res.send('Custom 404');
});

// listen to port
pico.listen(3000);
