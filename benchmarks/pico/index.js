const pico = require('../../');

pico.get('/', (req, res) => {
  res.send('ok');
});

pico.listen(3000);
