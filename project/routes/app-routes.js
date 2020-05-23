const express = require('express');
const router = express.Router();
const Image = require('../models/images');

/* REST */

router.get('/', (req, res) => {
    /* Find user */
    res.render('app/home');
});

router.get('/images/new', (req, res) => {
    res.render('app/images/new');
});

router.get('/images/:id/edit', (req, res) => {
    Image.findById(req.params.id, (err, img) => {
        console.log(img);
        res.render('app/images/edit', { image: img });
    });
});

/* Routes */

router.route('/images')
    .get((req, res) => {
        Image.find({}, (err, images) => {
            if (err)
                res.redirect('/app');
            else
                res.render('app/images/index', { images: images });
        });
    })
    .post((req, res) => {
        const data = {
            title: req.body.title
        };
        const image = new Image(data);
        image.save((err) => {
            if (!err)
                res.redirect('/app/images/' + image._id);
            else
                res.render(err);
        });
    });

router.route('/images/:id')
    .get((req, res) => {
        Image.findById(req.params.id, (err, img) => {
            res.render('app/images/show', { image: img });
        });
    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    });

module.exports = router;
