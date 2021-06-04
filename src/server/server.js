'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const superagent = require('superagent');
const methodOverride = require('method-override');
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.render('pages/home')
});

function run(PORT) {
    app.listen(PORT, () => {
        console.log("Server up on ", PORT);
    });
}
module.exports = {
    run,
    app
}
