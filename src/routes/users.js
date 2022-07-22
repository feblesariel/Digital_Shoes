// ************ Require's ************

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {body} = require("express-validator");
const guestMiddleware = require("../../middlewares/guestMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");

// ************ Multer Config ************

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let nombreCarpeta = path.join(__dirname, "../public/images/users");
        cb(null, nombreCarpeta)
    },
    filename: function (req, file, cb) {
        let nombreImagen = "img-" + Date.now() + path.extname(file.originalname);
        cb(null, nombreImagen);
    }
});

const updateFile = multer({ storage });

// ************ Validations ************

const validationsLoginForm = [
    body("email").isEmail().withMessage("Debes ingresar el correo electronico."),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener un minimo 6 caracteres.")
];

const validationsRegisterForm = [
    body("name").notEmpty().withMessage("Debes ingresar un nombre de usuario."),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener un minimo 6 caracteres."),
    body("domicilio").notEmpty().withMessage("Debes ingresar su domicilio."),
    body("zipcode").notEmpty().withMessage("Debes ingresar su codigo postal."),
    body("email").isEmail().withMessage("Debes ingresar tu correo."),
];

// ************ Controller Require ************

const usersController = require("../controllers/usersController");

// ************ Rutas ************

router.get("/login",guestMiddleware,usersController.login);
router.post("/login",validationsLoginForm ,usersController.loginProcess);

router.get("/register",guestMiddleware ,usersController.register);
router.post("/register", updateFile.single("user-image"), validationsRegisterForm, usersController.registerProcces);

router.get("/profile",authMiddleware,usersController.profile);
router.get("/logout",usersController.logout);


module.exports = router;