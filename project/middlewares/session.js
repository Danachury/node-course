const User = require('../models/user').User;

module.exports = (req, res, next) => {
    if (!req.session || !req.session.user_id) {
        console.debug('Invalid session, redirecting to /login');
        res.redirect('/login');
    } else {
        User.findById(req.session.user_id, (err, user) => {
            if (err) {
                console.error('Invalid login.', err);
                res.redirect('/login');
            } else {
                res.locals = { user: user };
                next();
            }
        });
    }
};
