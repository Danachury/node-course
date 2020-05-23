const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/:name', (req, res) => {
	res.render('form', {name:req.params.name});
});

app.post('/', (req, res) => {
	res.render('form');
});

app.listen(3000);
