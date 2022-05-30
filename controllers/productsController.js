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

const productsController = {

    products: function (req, res) {
        res.render("products", { products: products });
    },

    detail: function (req, res) {

        let idParams = req.params.id;
        let productoSeleccionado = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idParams) {
                productoSeleccionado = products[i];
            }
        }
        res.render("detail", { productoSeleccionado: productoSeleccionado });
    }
}

module.exports = productsController;