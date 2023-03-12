// ************ Requires ************

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { stringify } = require("querystring");

//--- DB

const db = require('../database/models/index.js');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Producto = db.Producto;
const Categoria = db.Categoria;
const Orden = db.Orden;
const Stock = db.Stock;
const Usuario = db.Usuario;
const Rol = db.Rol;

// ************ Controllers ************

const productsController = {

    home: function (req, res) {
        Producto.findAll({
            attributes: ['nombre', 'imagen', 'id', 'precio'],
            group: ['nombre']
        }).then(products => {
            let maxProducts = products.length;
            res.render('home', { products, maxProducts })
        });
    },

    products: function (req, res) {
        Producto.findAll({
            attributes: ['nombre', 'imagen', 'id', 'precio'],
            group: ['nombre']
        }).then(products => {
            res.render('products', { products })
        });
    },

    detail: function (req, res) {
        Producto.findByPk(req.params.id, {
            include: [{
                association: "stock"
            }],
        }).then(productoSeleccionado => {
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

            Producto.create(
                {
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    descripcion: req.body.descripcion,
                    id_categoria: req.body.categoria,
                    imagen: req.file ? req.file.filename : defaultImage
                }
            ).then((element) => {
                Stock.create({
                    unidades: req.body.stock,
                    id_product: element.id
                }).then(() => { return res.redirect('/products') })
            })
        }
    },

    edit: function (req, res) {

        Producto.findByPk(req.params.id, {
            include: [{
                association: "stock"
            }]
        }).then((old) => {
            res.render('product-edit-form', { old });
        })

    },

    editProcces: function (req, res) {

        let errors = validationResult(req);

        let productId = req.params.id;

        let imageOriginal;

        let old = {
            id: productId,
            ...req.body
        }

        if (!errors.isEmpty()) {
            return res.render("product-edit-form", { errors: errors.array(), old })
        } else {

            Producto.findByPk(productId).then((item) => {
                imageOriginal = item.image;
            })

            Producto.update(
                {
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    descripcion: req.body.descripcion,
                    id_categoria: req.body.categoria,
                    imagen: req.file ? req.file.filename : imageOriginal
                },
                {
                    where: { id: productId }
                })
                .then(() => {
                    Stock.update(
                        {
                            unidades: req.body.stock
                        },
                        {
                            where: { id_product: productId }
                        })
                        .then(() => { return res.redirect('/products/detail/' + req.params.id) })
                })
        }
    },

    destroy: function (req, res) {

        let productId = req.params.id;

        Stock.destroy({ where: { id_product: productId } })
            .then(() => {
                Producto.destroy({ where: { id: productId } })
            }).then(() => {
                return res.redirect('/products')
            })
    },

    carrito: function (req, res) {

        let old = req.session.userLogged;

        console.log(old);

        Orden.findAll({
            include: [{
                association: "producto"
            }]
        }).then((items) => {
            res.render("carrito", { items, old })
        })
    },

    carritoProcces: function (req, res) {

        let userInSession = req.session.userLogged;

        Producto.findByPk(req.params.id).then((item) => {
            Orden.create(
                {
                    id_user: userInSession.id,
                    id_product: req.params.id,
                    cantidad: 1,
                    precio: item.precio
                }
            ).then(() => {
                res.redirect("/products/carrito")
            })
        })
    },

    carritoDelete: function (req, res) {

        Orden.findByPk(req.params.id).then((item) => {
            Orden.destroy({ where: { id: item.id } })
                .then(() => {
                    res.redirect("/products/carrito")
                })
        })
    }
}


module.exports = productsController;