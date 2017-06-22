import test from 'ava';
import fetch from 'node-fetch';
import p from '../';

p.listen(4002);

test('serves 404', t => (
  fetch('http://localhost:4002/test/not').then((res) => {
    t.deepEqual(res.status, 404);

    return res.text();
  }).then((r) => {
    t.deepEqual(r, '404 - Not found!');
  }).catch((err) => {
    t.fail(err);
  })
));

test('serves statuses', t => {
  p.get('/test/status', (req, res) => {
    res.status(418);
    res.send('ok');
  });

  return fetch('http://localhost:4002/test/status').then((res) => {
    t.deepEqual(res.status, 418);

    return res.text();
  }).then((r) => {
    t.deepEqual(r, 'ok');
  }).catch((err) => {
    t.fail(err);
  });
});
