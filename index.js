'use strict';

const http = require('http');
const url = require('url');

let uses = [];
let routes = [];

const serve = (route, method, cb) => {
	if (route !== null && method !== null && cb !== null && typeof cb === 'function') {
		const r = {};

		r.route = route;
		r.method = method;
		r.cb = cb;

		if (typeof route === 'string') {
			r.match = new RegExp('^' + route.replace(/:\w+/g, '*') + '$', 'i');
		} else if (route instanceof RegExp) {
			r.match = route;
		} else {
			console.log(typeof route);
			throw new Error('Route must be a string or regexp');
		}

		routes = routes.concat(r);
	} else {
		throw new Error('Req must be supplied with a valid route, method and callback.');
	}
};

const use = (cb) => {
	// serve(route, '_', cb);
	if (typeof cb === 'function') {
		uses = uses.concat({ fn: cb });
	}
};

const get = (route, cb) => {
	serve(route, 'get', cb);
};

const post = (route, cb) => {
	serve(route, 'post', cb);
};

const put = (route, cb) => {
	serve(route, 'put', cb);
};

const del = (route, cb) => {
	serve(route, 'delete', cb);
};

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url);
	let match = false;

	res.setHeader('x-server', 'Pico');

	res.status = (code) => {
		res.statusCode = code;
	};

	res.contentType = (type) => {
		res.setHeader('Content-Type', type);
	};

	res.send = (text) => {
		match = true;
		res.end(text);
	};

	const r = () => {
		for (const key in routes) {
			if (routes[key].match.test(parsedUrl.pathname) && (routes[key].method.match(new RegExp(req.method, 'i')) || routes[key].method === '_')) {
				const route = routes[key];

				try {
					route.cb(req, res);
				} catch (e) {
					console.log(e);

					if (res.finished === false) {
						res.writeHead(200, { 'Content-Type': 'text/plain' });
						res.status(500);
						res.end('500 - Server error: \n' + e.message);
					}
				}

				match = true;
				break;
			}
		}
	};

	const next = (u) => {
		if (u < uses.length) {
			const n = (u) => (
				() => {
					next(u);
				}
			);

			uses[u].fn(req, res, n(u + 1));
		} else {
			r();
		}
	};

	try {
		if (uses.length === 0) {
			r();
		} else {
			next(0);
		}
	} catch (e) {
		console.log(e);
	}

	if (!match) {
		res.status(404);
		res.send('404 - Not found!');
	}
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

const listen = (port, cb) => {
	server.listen(port, cb);

	return server;
};

module.exports = {
	listen,
	serve,
	use,
	get,
	post,
	put,
	delete: del
};
