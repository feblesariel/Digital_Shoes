// ************ Require's ************

const express = require ("express");
const router = express.Router();
const multer = require ("multer");
const path = require ("path");
const {body} = require ("express-validator");
const noEstasLogueadoMiddleware = require ("../middlewares/noEstasLogueadoMiddleware");

// ************ Multer Config ************

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let nombreCarpeta = path.join(__dirname, "../../public/images/products");
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
    body("nombre").notEmpty().withMessage("Debes ingresar un nombre de producto.").bail().isLength({min: 5}).withMessage("El nombre debe tener un min de 5 caracteres."),
    body("precio").notEmpty().withMessage("Debes ingresar un precio.").bail().isInt().withMessage("El precio debe ser un numero."),
    body("descripcion").notEmpty().withMessage("Debes ingresar una descripcion.").bail().isLength({min: 20}).withMessage("La descripcion debe tener un min de 20 caracteres."),
    body("categoria").notEmpty().withMessage("Debes ingresar una categoria para el producto."),


];
const validationsEditForm = [
    body("nombre").notEmpty().withMessage("Debes ingresar un nombre de producto.").bail().isLength({min: 5}).withMessage("El nombre debe tener un min de 5 caracteres."),
    body("precio").notEmpty().withMessage("Debes ingresar un precio.").bail().isInt().withMessage("El precio debe ser un numero."),
    body("descripcion").notEmpty().withMessage("Debes ingresar una descripcion.").bail().isLength({min: 20}).withMessage("La descripcion debe tener un min de 20 caracteres."),
    body("categoria").notEmpty().withMessage("Debes ingresar una categoria para el producto."),
];

// ************ Controller Require ************

const productsController = require ("../controllers/productsController")

// ************ Rutas ************

router.get("/", productsController.home);

router.get("/products/", productsController.products);
router.get("/products/detail/:id/", productsController.detail);

router.get("/products/create/", noEstasLogueadoMiddleware,productsController.create);
router.post("/products/create/", noEstasLogueadoMiddleware,updateFile.single("product-image"), validationsCreateForm ,productsController.createProcces);

router.get("/products/edit/:id/", noEstasLogueadoMiddleware,productsController.edit);
router.put("/products/edit/:id/", noEstasLogueadoMiddleware ,updateFile.single("product-image"), validationsEditForm ,productsController.editProcces);

router.delete("/products/delete/:id/", noEstasLogueadoMiddleware,productsController.destroy);

router.get("/products/carrito/", noEstasLogueadoMiddleware,productsController.carrito);
router.post("/products/carrito/:id/", noEstasLogueadoMiddleware ,productsController.carritoProcces);
router.delete("/products/carrito/delete/:id/", noEstasLogueadoMiddleware ,productsController.carritoDelete);


module.exports = router;