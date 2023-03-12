// ************ Require's ************

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {body} = require("express-validator");
const estasLogueadoMiddleware = require("../middlewares/estasLogueadoMiddleware");
const noEstasLogueadoMiddleware = require("../middlewares/noEstasLogueadoMiddleware");

// ************ Multer Config ************

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let nombreCarpeta = path.join(__dirname, "../../public/images/users");
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
    body("password").notEmpty().withMessage("Debes ingresar una contraseña.").bail().isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo 8 caracteres.")
];

const validationsRegisterForm = [
    body("name").notEmpty().withMessage("Debes ingresar un nombre de usuario.").bail().isLength({ min: 2}).withMessage("El nombre de usuario debe tener al menos 2 caracteres."),
    body("password").notEmpty().withMessage("Debes ingresar una contraseña para el usuario.").bail().isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo 8 caracteres."),
    body("domicilio").notEmpty().withMessage("Debes ingresar un domicilio."),
    body("zipcode").notEmpty().withMessage("Debes ingresar un codigo postal."),
    body("email").notEmpty().withMessage("Debes ingresar un correo electronico.").bail().isEmail().withMessage("Debes usar un formato valido para el correo."),
];

const validationsEditUsersForm = [
    body("name").notEmpty().withMessage("Debes ingresar un nombre de usuario.").bail().isLength({ min: 2}).withMessage("El nombre de usuario debe tener al menos 2 caracteres."),
    body("password").notEmpty().withMessage("Debes ingresar una contraseña para el usuario.").bail().isLength({ min: 8 }).withMessage("La contraseña debe tener un minimo 8 caracteres."),
    body("domicilio").notEmpty().withMessage("Debes ingresar un domicilio."),
    body("zipcode").notEmpty().withMessage("Debes ingresar un codigo postal."),
];

// ************ Controller Require ************

const usersController = require("../controllers/usersController");

// ************ Rutas ************

router.get("/login/", estasLogueadoMiddleware,usersController.login);
router.post("/login/", estasLogueadoMiddleware,validationsLoginForm ,usersController.loginProcess);

router.get("/register/", estasLogueadoMiddleware,usersController.register);
router.post("/register/", estasLogueadoMiddleware,updateFile.single("user-image"), validationsRegisterForm, usersController.registerProcces);

router.get("/profile/",noEstasLogueadoMiddleware, usersController.profile);
router.get("/logout/",noEstasLogueadoMiddleware, usersController.logout);

router.get("/profile/edit/", noEstasLogueadoMiddleware ,usersController.accountEdit);
router.put("/profile/edit/", noEstasLogueadoMiddleware,updateFile.single("user-image"), validationsEditUsersForm , usersController.accountEditProcces);
router.delete("/profile/delete/:id/", noEstasLogueadoMiddleware,usersController.destroy);



module.exports = router;