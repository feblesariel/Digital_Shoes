// ************ Requires ************

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");


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

    product: function (req, res) {
        res.render("product");
    },

    register: function (req, res) {
        res.render("register");
    },

    nuevoUsuario: function (req, res) {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("register", { errors: errors.array(), old: req.body })
        } else {
            let newUser = {
                usuario: req.body.name,
                password: req.body.pass,
                address: req.body.domicilio,
                zipcode: req.body.zipcode,
                email: req.body.email
            }
            users.push(newUser);
            let usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, usersJSON);

            res.redirect("/")
        }
    },

    adicionar: function (req, res) {
        res.render("adicionar");
    },

    editar: function (req, res) {
        res.render("editar");
    },


    login: function (req, res) {
        res.render("login");
    },

    carrito: function (req, res) {
        res.render("carrito");
    }
}

module.exports = mainController;