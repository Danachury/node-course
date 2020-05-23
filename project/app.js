const express = require('express');
// const expressSession = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const User = require('./models/user').User;
const appRouter = require('./routes/app-routes');
const sessionMiddleware = require('./middlewares/session');

const app = express();

// Middleware
app.set('view engine', 'pug');
app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressSession({
//     secret: 'nodeCourseSessionSecret1ub',
//     resave: false,
//     saveUninitialized: false
// }));
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use('/app', sessionMiddleware);
app.use('/app', appRouter);

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
    });
    console.log('passwordConfirmation ==> ' + user.passwordConfirmation);
    user.save((err) => {
        if (err) {
            console.error(String(err));
            res.send(String(err));
        } else
            res.send('We saved your data...');
    });
});

app.post('/session', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
        if (user === null)
            res.send('Invalid credentials...');
        else {
            req.session.user_id = user._id;
            // res.send('Logged successfully with username: <b>' + JSON.stringify(user.username) + '</b>');
            // console.log('Logged successfully with username: <b>' + JSON.stringify(user.username) + '</b>');
            res.redirect('/app')
        }
    });
});

// Server
app.listen(3000);
