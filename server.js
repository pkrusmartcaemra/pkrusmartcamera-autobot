const request = require('request');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cameras = require('./camera.json');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    if (req.query) {
        if (req.query.camera && req.query.full) {
            const camera = cameras.find((c) => c.id = req.query.camera);
            if (!camera) return res.redirect('/');
            res.render('pages/full', {camera: camera});
        } else if (req.query.camera) {
            const camera = cameras.find((c) => c.id == req.query.camera);
            if (!camera) return res.redirect('/');
            res.render('pages/camera', {camera: camera});
        } else {
            res.render('pages/index', {cameras: cameras});
        }
    } else {
        res.render('pages/index', {cameras: cameras});
    }
})

app.get('/camera', (req, res) => {
    res.redirect('/');
})

app.get('/camera/:id', (req, res) => {
    const camera = cameras.find((c) => c.id == req.params.id);
    if (!camera) return res.redirect('/');
    res.render('pages/camera', {camera: camera});
})

app.get('/camera/:id/full', (req, res) => {
    const camera = cameras.find((c) => c.id = req.params.id);
    if (!camera) return res.redirect('/');
    res.render('pages/full', {camera: camera});
})

app.get('/camera/:id/photo', (req, res) => {
    const camera = cameras.find((c) => c.id = req.params.id);
    if (!camera) return res.redirect('/');
    request.get(camera.photo, {headers: {'authorization': camera.photo_auth}}).pipe(res);
})

app.listen(port, () => {
    console.log("app is listening on", "http://localhost:"+port);
})