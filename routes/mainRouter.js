// ************ Require's ************

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

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
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener un minimo 6 caracteres."),
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
    body("email").isEmail().withMessage("Debes ingresar el correo electronico."),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener un minimo 6 caracteres.")
];

// ************ Controller Require ************

const mainController = require("../controllers/mainController")


// ************ Rutas ************

router.get("/", mainController.home);

router.get("/create/", authMiddleware,mainController.create);
router.post("/", updateFile.single("product-image"), validationsCreateForm ,mainController.store);

router.get("/register/",guestMiddleware ,mainController.register);
router.post("/register/", updateFile.single("user-image"), validationsRegisterForm, mainController.nuevoUsuario);


router.get("/login",guestMiddleware,mainController.login);
router.post("/login",validationsLoginForm ,mainController.loginProcess);

router.get("/profile",authMiddleware,mainController.profile);
router.get("/logout",mainController.logout);


router.get("/carrito", mainController.carrito);


module.exports = router;