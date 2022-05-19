const express = require('express');

const path = require('path');

const app = express();

const mainRouter= require ("./routes/mainRouter");

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.set ("view engine", "ejs");

app.use('/', mainRouter);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(3000, () => {
    console.log('Server running in 3000 port');
});