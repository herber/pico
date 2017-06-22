import test from 'ava';
import fetch from 'node-fetch';
import p from '../';

p.listen(4001);

const methods = [
  'get',
  'post',
  'put',
  'delete'
];

// serve tests
methods.forEach((m) => {
  test('serves ' + m + ' requests', t => {
    p[m]('/test/' + m, (req, res) => {
      res.send('ok');
    });

    return fetch('http://localhost:4001/test/' + m, { method: m }).then((res) => (
      res.text()
    )).then((r) => {
      t.deepEqual(r, 'ok');
    }).catch((err) => {
      t.fail(err);
    });
  });
});

test('serves requests with use', t => {
  p.use((req, res, next) => {
    res.contentType('text/html');

    next();
  });

  p.get('/test/use', (req, res) => {
    res.send('ok');
  });

  return fetch('http://localhost:4001/test/use').then((res) => {
    t.deepEqual(res.headers.get('Content-Type'), 'text/html');

    return res.text();
  }).then((r) => {
    t.deepEqual(r, 'ok');
  }).catch((err) => {
    t.fail(err);
  });
});
