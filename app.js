const express = require('express');

const path = require('path');

const app = express();

const mainRouter= require ("./routes/mainRouter");

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.set ("view engine", "ejs");

app.use('/', mainRouter);

app.listen(3000, () => {
    console.log('Server running in 3000 port');
});


/*app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/home.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./views/login.html'));
});

app.get('/product', (req, res) => {
    res.sendFile(path.resolve('./views/product.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve('./views/carrito.html'));
});
*/