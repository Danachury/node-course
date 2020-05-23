const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	fs.readFile('./index.html', (err, file) => {
		res.writeHead(200, {'Content-Type':'application/json'});
		res.write(JSON.stringify({name: 'Denilson', username: 'danachury'}));
		res.end();
	});
});

server.listen(3000);
