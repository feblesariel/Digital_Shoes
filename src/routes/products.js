// ************ Require's ************

const express = require ("express");
const router = express.Router();
const multer = require ("multer");
const path = require ("path");
const {body} = require ("express-validator");
const authMiddleware = require ("../../middlewares/authMiddleware");

// ************ Multer Config ************

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let nombreCarpeta = path.join(__dirname, "../public/images/products");
        cb(null, nombreCarpeta)
    },
    filename: function (req, file, cb) {
        let nombreImagen = "img-" + Date.now() + path.extname(file.originalname);
        cb(null, nombreImagen);
    }
});

const updateFile = multer({ storage });

// ************ Validations ************

const validationsCreateForm = [
    body("nombre").notEmpty().withMessage("Debes ingresar un nombre de producto."),
    body("precio").notEmpty().bail().withMessage("Debes ingresar un precio.").isInt().withMessage("Debes ingresar un numero."),
    body("descripcion").notEmpty().withMessage("Debes ingresar una descripcion."),
];
const validationsEditForm = [
    body("nombre").notEmpty().withMessage("Debes ingresar un nombre de producto."),
    body("precio").notEmpty().bail().withMessage("Debes ingresar un precio."),
    body("descripcion").notEmpty().withMessage("Debes ingresar una descripcion."),
];

// ************ Controller Require ************

const productsController = require ("../controllers/productsController")

// ************ Rutas ************

router.get("/", productsController.home);

router.get("/products/", productsController.products);
router.get("/products/detail/:id/", productsController.detail);

router.get("/products/create/", authMiddleware,productsController.create);
router.post("/products/create/", updateFile.single("product-image"), validationsCreateForm ,productsController.createProcces);

router.get("/products/edit/:id/", authMiddleware,productsController.edit);
router.put("/products/edit/:id/", updateFile.single("product-image"), validationsEditForm ,productsController.editProcces);

router.delete("/products/delete/:id/",productsController.destroy);

router.get("/products/carrito/", authMiddleware,productsController.carrito);
router.post("/products/carrito/:id/", authMiddleware ,productsController.carritoProcces);


module.exports = router;