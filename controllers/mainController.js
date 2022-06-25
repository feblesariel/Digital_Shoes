// ************ Requires ************

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { stringify } = require("querystring");
const bcrypt = require('bcryptjs');


// ************ Archivo de usuarios ************

const usersFilePath = path.join(__dirname, "../data/userData.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// ************ Archivo de productos ************

const productsFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


// ************ Controllers ************

const mainController = {

    home: function (req, res) {
        res.render("home", { products: products });
    },

    create: function (req, res) {
        res.render("product-create-form");
    },

    store: function (req, res) {

        let errors = validationResult (req);

        if (!errors.isEmpty()) {
            return res.render("product-create-form", { errors: errors.array(), old: req.body})
        } else {
            let defaultImage = "default-image.png";            
            let nuevoProducto = {
                id: products.length + 1,
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                imagen: req.file ? req.file.filename : defaultImage
            }
            products.push(nuevoProducto);
            let productJSON = JSON.stringify(products);
            fs.writeFileSync(productsFilePath, productJSON);
            res.redirect("/products");
        }
    },

    register: function (req, res) {
        res.render("register");
    },

    nuevoUsuario: function (req, res) {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("register", { errors: errors.array(), old: req.body })
        } else {
            let defaultImage = "default_image.png"; 
            let passEncriptada = bcrypt.hashSync(req.body.pass , 10 );
            let newUser = {
                usuario: req.body.name,
                password: passEncriptada,
                address: req.body.domicilio,
                zipcode: req.body.zipcode,
                email: req.body.email,
                imagen: req.file ? req.file.filename : defaultImage
            }
            users.push(newUser);
            let usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, usersJSON);

            res.redirect("/")
        }
    },

    login: function (req, res) {
        res.render("login");
    },

    proccesLogin: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("login", { errors: errors.array(), old: req.body })
        } else {
            res.send("ESTAMOS TRABAJANDO");
        }
    },

    carrito: function (req, res) {
        res.render("carrito");
    }

}


module.exports = mainController;