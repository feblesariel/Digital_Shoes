const express = require ("express");

const router = express.Router();

const mainController = require ("../controllers/mainController")

router.get ("/", mainController.home);

router.get ("/product", mainController.product);

router.get ("/register", mainController.register);

router.get ("/login", mainController.login);

router.get ("/carrito", mainController.carrito);


module.exports = router;
