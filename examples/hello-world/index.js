const pico = require('../../');

pico.get('/', (req, res) => {
  res.contentType('text/html');

  res.send('<h1>Hello World</ h1>');
});

pico.listen(3000);
