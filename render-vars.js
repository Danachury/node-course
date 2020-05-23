const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	fs.readFile('./index.html', (err, html) => {

		var htmlString = html.toString();
		const variables = htmlString.match(/[^\{\}]+(?=\})/g);

		const name = 'Denilson';
		const lastName = 'Anachury';

		for (var i = variables.length - 1; i >= 0; i--) {
			const value = eval(variables[i]);
			htmlString = htmlString.replace('{' + variables[i] + '}', value);
		}

		res.writeHead(200, {'Content-Type':'text/html'});
		res.write(htmlString);
		res.end();
	});
});

server.listen(3000);
