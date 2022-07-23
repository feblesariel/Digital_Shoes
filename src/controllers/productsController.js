// ************ Requires ************

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { stringify } = require("querystring");

//--- DB

const db = require('../database/models/index.js');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Product = db.Product;


// ************ Controllers ************

const productsController = {

    home: function (req, res) {
        Product.findAll().then(products => {
            res.render('home', { products })
        });
    },

    products: function (req, res) {
        Product.findAll().then(products => {
            res.render('products', { products })
        });
    },

    detail: function (req, res) {

        Product.findByPk(req.params.id).then(productoSeleccionado => {
            res.render('detail', { productoSeleccionado });
        });
    },

    create: function (req, res) {
        res.render("product-create-form");
    },

    createProcces: function (req, res) {
        let errors = validationResult(req);
        let defaultImage = "default-image.png";
        if (!errors.isEmpty()) {
            return res.render("product-create-form", { errors: errors.array(), old: req.body })
        } else {
            Product.create(
                {
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    imagen: req.file ? req.file.filename : defaultImage,
                    descripcion: req.body.descripcion
                }
            )
                .then(() => { return res.redirect('/products') })
                .catch(error => res.send(error))
        }
    },

    edit: function (req, res) {

        Product.findByPk(req.params.id).then(productToEdit => {
            let old = productToEdit;
            res.render('product-edit-form', { productToEdit: productToEdit, old: old });
        });
    },

    editProcces: function (req, res) {

        let errors = validationResult(req);
        let defaultImage = "default-image.png";
        if (!errors.isEmpty()) {
            return res.render("product-edit-form", { errors: errors.array(), old: req.body })
        } else {
            let productId = req.params.id;
            Product
                .update(
                    {
                        nombre: req.body.nombre,
                        precio: req.body.precio,
                        imagen: req.file ? req.file.filename : defaultImage,
                        descripcion: req.body.descripcion
                    },
                    {
                        where: { id: productId }
                    })
                .then(() => {
                    return res.redirect('/products')
                })
                .catch(error => res.send(error))
        }
    },

    destroy: function (req, res) {

        let productId = req.params.id;
        Product
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error))
    },

    carrito: function (req, res) {
        let temporal = req.session.carrito;
        res.render("carrito", { temporal });
    },

    carritoProcces: function (req, res) {

        let temporal = [];
        if (!req.session.carrito){
            req.session.carrito = [];
        }

        Product.findByPk(req.params.id).then(item => {
            req.session.carrito.push(item);
            temporal = req.session.carrito;            
            return res.render("carrito", { temporal });
        });

    }
}


module.exports = productsController;