// ************ Require's ************

const express = require('express');
const session = require("express-session");
const path = require('path');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

// ************ express() - (don't touch) ************

const app = express();

// ************ Middlewares - (don't touch) ************

const publicPath = path.resolve(__dirname, './public');
app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
}));
app.use(userLoggedMiddleware);
app.use(express.static(publicPath));  // Indica donde estan los archivos estáticos /public
app.use(express.urlencoded({ extended: false }));  // Captura la informacion enviada por POST
app.use(express.json());
app.use(methodOverride('_method'));  // Para poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/src/views')); // Define la ubicación de la carpeta de las Vistas

// ************ Route System require and use() ************

const usersRouter = require("./src/routes/users");
const productsRouter = require("./src/routes/products")

app.use('/users', usersRouter);
app.use('/', productsRouter);

// ************ Run server ************

app.listen(3000, () => {
    console.log('Server running in 3000 port');
});