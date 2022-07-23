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
const { Op, where } = require("sequelize");

const User = db.User;


// ************ Controllers ************

const usersController = {

    login: function (req, res) {
        res.render("login");
    },

    loginProcess: function (req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("login", { errors: errors.array(), old: req.body })
        }

        User.findOne({ where: { email: req.body.email } }).then(function (usuario) {
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
        res.render("register");
    },

    registerProcces: function (req, res) {

        let errors = validationResult(req);
        let defaultImage = "default_image.png";

        if (!errors.isEmpty()) {
            return res.render("register", { errors: errors.array(), old: req.body })
        }

        User.findOne({ where: { email: req.body.email } }).then(function (usuario) {
            if (usuario) {
                return res.render("register", { errors: [{ msg: "Email ya registrado." }], old: req.body })
            }
        })

        User.create(
            {
                email: req.body.email,
                contraseña: bcrypt.hashSync(req.body.password, 10),
                nombre: req.body.name,
                domicilio: req.body.domicilio,
                zipcode: req.body.zipcode,
                imagen: req.file ? req.file.filename : defaultImage,
            }
        ).then(() => { return res.redirect("/users/login") })
        .catch(error => res.send(error));

    },

    profile: function (req, res) {
        res.render("userProfile", { user: req.session.userLogged });
    },

    logout: function (req, res) {
        req.session.destroy();
        return res.redirect("/");
    }

}


module.exports = usersController;