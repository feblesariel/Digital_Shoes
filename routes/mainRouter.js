// ************ Require's ************

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");

// ************ Multer Config ************


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let nombreCarpeta = path.join(__dirname, "../public/images");
        cb(null, nombreCarpeta)
    },
    filename: function (req, file, cb) {
        let nombreImagen = "img-" + Date.now() + path.extname(file.originalname);
        cb(null, nombreImagen);
    }
});

const updateFile = multer({ storage });


// ************ Validations ************

const validationsRegisterForm = [
    body("name").notEmpty().withMessage("Debes ingresar un nombre de usuario."),
    body("pass").isLength({ min: 6 }).withMessage("La contraseña debe tener un minimo 6 caracteres."),
    body("domicilio").notEmpty().withMessage("Debes ingresar su domicilio."),
    body("zipcode").notEmpty().withMessage("Debes ingresar su codigo postal."),
    body("email").isEmail().withMessage("Debes ingresar tu correo."),
];

const validationsCreateForm = [
    body("nombre").notEmpty().withMessage("Debes ingresar un nombre de producto."),
    body("precio").notEmpty().bail().withMessage("Debes ingresar un precio.").isInt().withMessage("Debes ingresar un numero."),
    body("descripcion").notEmpty().withMessage("Debes ingresar una descripcion."),
];

const validationsLoginForm = [
    body("name").notEmpty().withMessage("Debes ingresar un nombre de usuario."),
    body("pass").notEmpty().withMessage("Debes ingresar una contraseña.")
];

// ************ Controller Require ************

const mainController = require("../controllers/mainController")


// ************ Rutas ************

router.get("/", mainController.home);

router.get("/create/", mainController.create);
router.post("/", updateFile.single("product-image"), validationsCreateForm ,mainController.store);

router.get("/register/", mainController.register);
router.post("/register/", updateFile.single("user-image"), validationsRegisterForm, mainController.nuevoUsuario);


router.get("/login",mainController.login);
router.post("/login",validationsLoginForm ,mainController.proccesLogin);

router.get("/carrito", mainController.carrito);


module.exports = router;