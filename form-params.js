const http = require('http');
const fs = require('fs');
const parse = require('./params-parser.js').parse;
const render = require('./view-render.js').render;

const server = http.createServer((req, res) => {

	if (req.url.indexOf('favicon.ico') > 0) {
		return;
	}

	fs.readFile('./index.html', (err, html) => {

		if (err) {
			res.writeHead(500, {'Content-Type':'text/html'});
		} else {

			var params = parse(req);

			res.writeHead(200, {'Content-Type':'text/html'});
			res.write(render(html, params));
		}

		res.end();
	});
});

server.listen(3000);
