// ************ Require's ************
const express = require ("express");
const router = express.Router();
const multer = require ("multer");
const path = require ("path");

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

// ************ Controller Require ************
const mainController = require ("../controllers/mainController")

router.get ("/", mainController.home);

router.get ("/product", mainController.product);


router.get ("/register/", mainController.register);
router.post("/register/", mainController.nuevoUsuario);

router.post("/adicionar/", mainController.adicionar);

router.post("/editar/", mainController.editar);

router.get ("/login", mainController.login);

router.get ("/carrito", mainController.carrito);


module.exports = router;
