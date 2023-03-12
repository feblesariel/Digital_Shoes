// ************ Requires ************

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { stringify } = require("querystring");
const bcrypt = require('bcryptjs');
//const User = require("../../models/User");  // MODELO USER

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

const usersController = {

    login: function (req, res) {
        return res.render("login");
    },

    loginProcess: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("login", { errors: errors.array(), old: req.body })
        }

        Usuario.findOne({ where: { email: req.body.email } }).then(function (usuario) {
            if (usuario) {
                let isOkPassword = bcrypt.compareSync(req.body.password, usuario.contraseña);
                if (isOkPassword) {
                    req.session.userLogged = usuario;
                    return res.redirect("/users/profile");
                } else {
                    return res.render("login", { errors: [{ msg: "Contraseña incorrecta." }], old: req.body });
                }
            }
            return res.render("login", { errors: [{ msg: "Usuario no registrado." }], old: req.body });
        })
    },

    register: function (req, res) {
        return res.render("register");
    },

    registerProcces: function (req, res) {

        let errors = validationResult(req);
        let defaultImage = "default_image.png";

        if (!errors.isEmpty()) {
            return res.render("register", { errors: errors.array(), old: req.body })
        }

        Usuario.findOne({ where: { email: req.body.email } }).then(function (usuario) {
            if (usuario) {
                return res.render("register", { errors: [{ msg: "Email ya registrado." }], old: req.body })
            }
        })
        Usuario.create(
            {
                email: req.body.email,
                contraseña: bcrypt.hashSync(req.body.password, 10),
                nombre: req.body.name,
                domicilio: req.body.domicilio,
                zipcode: req.body.zipcode,
                imagen: req.file ? req.file.filename : defaultImage,
            }
        ).then(function () { return res.redirect("/users/login") })
    },

    profile: function (req, res) {
        res.render("userProfile", { user: req.session.userLogged });
    },

    logout: function (req, res) {

        req.session.destroy();

    },

    accountEdit: function (req, res) {

        let old = req.session.userLogged;

        return res.render("accountEdit", { old });

    },

    accountEditProcces: function (req, res) {

        let old = req.session.userLogged;

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("accountEdit", { errors: errors.array(), old: req.body })
        }

        Usuario.update(
            {
                nombre: req.body.name,
                contraseña: bcrypt.hashSync(req.body.password, 10),
                domicilio: req.body.domicilio,
                zipcode: req.body.zipcode,
                imagen: req.file ? req.file.filename : old.image
            },
            {
                where: { id: old.id }
            })
            .then(() => {
                Usuario.findByPk(old.id).then((usuario) => {
                    req.session.userLogged = usuario;
                    return res.redirect('/users/profile')
                })
            })
    },

    destroy: function (req, res) {

        let productId = req.params.id;

        req.session.destroy();

        Usuario.destroy({ where: { id: productId }, force: true })
            .then(() => {
                return res.redirect('/users/login')
            })
    },
}



module.exports = usersController;