const pico = require('../../');
const fs = require('fs');
const path = require('path');

pico.get(/\/.*/, (req, res) => {
  fs.readFile(path.join(__dirname, 'html-files', req.url), (err, data) => {
    if (err) {
      res.status(404);
      res.send('Not found');
    } else {
      res.send(data.toString());
    }
  });
});

pico.listen(3000);
