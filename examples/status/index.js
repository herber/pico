const pico = require('../../');

pico.get('/.*', (req, res) => {
  res.contentType('text/html');
  res.status(404);

  res.send('<h1>Not found</ h1>');
});

pico.listen(3000);
