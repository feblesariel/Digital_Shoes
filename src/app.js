// ************ Require's ************

const express = require('express');
const session = require("express-session");
const path = require('path');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware"); // Usuario logueado false o true
const userAdmin = require("./middlewares/userAdmin"); // User admin false o true

// ************ express() - (don't touch) ************

const app = express();

// ************ Middlewares - (don't touch) ************

const publicPath = path.resolve(__dirname, '../public');
app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false,
}));
app.use(userLoggedMiddleware);
app.use(userAdmin);
app.use(express.static(publicPath));  // Indica donde estan los archivos estáticos /public
app.use(express.urlencoded({ extended: false }));  // Captura la informacion enviada por POST
app.use(express.json());
app.use(methodOverride('_method'));  // Para poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ************ Route System require and use() ************

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products")
const apiUsersRouter = require("./routes/api/users");
const apiProductsRouter = require("./routes/api/products")

app.use('/users', usersRouter);
app.use('/', productsRouter);
app.use('/api/users',apiUsersRouter);
app.use('/api/products',apiProductsRouter);

// ************ Run server ************

app.listen(3001, () => {
    console.log('Server running in 3001 port');
});