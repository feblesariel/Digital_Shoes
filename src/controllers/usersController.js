// ************ Requires ************

const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { stringify } = require("querystring");
const bcrypt = require('bcryptjs');
const User = require("../../models/User");

//--- DB

const db = require('../database/models/index.js');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//const User = db.User;

// ************ Archivo de usuarios ************

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));


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

        let userToLogin = User.findByField("email", req.body.email);
        if (userToLogin) {
            let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (isOkPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                return res.redirect("/users/profile");
            } else {
                return res.render("login", { errors: [{ msg: "Contraseña incorrecta." }], old: req.body });
            }
        }
        return res.render("login", { errors: [{ msg: "Usuario no registrado." }], old: req.body });
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

        let userInDB = User.findByField("email", req.body.email);

        if (userInDB) {
            return res.render("register", { errors: [{ msg: "Email ya registrado." }], old: req.body })
        }

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            imagen: req.file ? req.file.filename : defaultImage
        }

        let userCreated = User.create(userToCreate);

        res.redirect("/users/login");
    },

    profile: function (req, res) { 
        res.render("userProfile", {
            user: req.session.userLogged
        });
    },

    logout: function (req, res){
        req.session.destroy();
        return res.redirect("/");
    }

}


module.exports = usersController;