// ************ Require's ************

const express = require ("express");
const router = express.Router();
const multer = require ("multer");
const path = require ("path");
const {body} = require ("express-validator");

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

const validationsEditForm = [
    body("nombre").notEmpty().withMessage("Debes ingresar un nombre de producto."),
    body("precio").notEmpty().bail().withMessage("Debes ingresar un precio."),
    body("descripcion").notEmpty().withMessage("Debes ingresar una descripcion."),
];

// ************ Controller Require ************

const productsController = require ("../controllers/productsController")


// ************ Rutas ************

router.get("/", productsController.products);

router.get("/:id/", productsController.detail);

router.get("/edit/:id/", productsController.edit);

router.put("/edit/:id/", updateFile.single("product-image") , validationsEditForm ,productsController.update);



module.exports = router;