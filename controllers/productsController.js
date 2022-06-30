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
    },

    edit: function (req, res) {
        let idParams = req.params.id;
        let productToEdit = 0;
        let old = 0;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idParams) {
                productToEdit = products[i];
                old = products[i];
            }
        }

        res.render("product-edit-form", { productToEdit: productToEdit, old: old });
    },

    update: function (req, res) {
        let errors = validationResult(req);
        let idParams = req.params.id;

        if (!errors.isEmpty()) {
            return res.render("product-edit-form", { errors: errors.array(), old: req.body })
        } else {
            let defaultImage = "default-image.png";
            let productoActualizado = {
                id: req.params.id,
                nombre: req.body.nombre,
                precio: req.body.precio,
                descripcion: req.body.descripcion,
                imagen: req.file ? req.file.filename : defaultImage
            }
            let nuevoArray = products.filter(product => product.id != idParams);
            nuevoArray.push(productoActualizado);
            let productJSON = JSON.stringify(nuevoArray);
            fs.writeFileSync(productsFilePath, productJSON);
            res.redirect("/products/" + idParams);
        }
    },

    destroy: function (req, res) {
        let idParams = req.params.id;
        let nuevoArray = products.filter(product => product.id != idParams);
        let productJSON = JSON.stringify(nuevoArray);
        fs.writeFileSync(productsFilePath, productJSON);
        res.redirect("/products");
    },

    carrito: function (req, res) {
        let idParams = req.params.id;
        if (!req.session.carrito)
        {
            req.session.carrito = [];
        }        
        let temp = 0;
        let temp2 = 0;

        for (let i = 0 ; i < products.length ; i++){
            if (products[i].id == idParams){ 
                temp = products[i]; 
                req.session.carrito.push(temp);
            }
        }
        temp2 = req.session.carrito;
        return res.render("carrito", {temp2});
    }
}

module.exports = productsController;