const pico = require('../../');

pico.use((req, res, next) => {
  console.log(req.method + ' ' + req.url + ' on ' + new Date());

  next();
});

pico.get('/', (req, res) => {
  res.contentType('text/html');

  res.send('<h1>Hello World</ h1>');
});

pico.listen(3000);
