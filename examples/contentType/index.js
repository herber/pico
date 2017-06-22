const pico = require('../../');

pico.get('/*', (req, res) => {
  res.contentType('application/json');

  const userList = [
    {
      id: 1,
      name: 'John Doe'
    },
    {
      id: 2,
      name: 'Jane Doe'
    }
  ];

  res.send(JSON.stringify(userList));
});

pico.listen(3000);
