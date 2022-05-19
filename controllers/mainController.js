const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/userData.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));


const mainController = {

    home: function (req, res) {
        const shoes = [
            {
                nombre: 'Air Jordan',
                precio: '$1850.00',
                imagen: '<img src="./images/zapatillas-Air-Jordan.png" class="product-img" alt="">'
            },
            {
                nombre: 'Air Max',
                precio: '$1600.00',
                imagen: '<img src="./images/zapatillas-nike-air-max_ccexpress.png" class="product-img" alt="">'
            },
            {
                nombre: 'Nike Blue',
                precio: '$2050.00',
                imagen: '<img src="./images/zapatillas-nike-azul.png" class="product-img" alt="">'
            },
            {
                nombre: 'Flywire',
                precio: '$2250.00',
                imagen: '<img src="./images/zapatillas-nike-flywire.png" class="product-img" alt="">'
            },
            {
                nombre: 'Zapatillas',
                precio: '$2000.00',
                imagen: '<img src="./images/zapatillas.png" class="product-img" alt="">'
            }

        ]

        res.render("home", { shoes: shoes });
    },
    product: function (req, res) {
        res.render("product");
    },

    register: function (req, res) {
        res.render("register");
    },

    nuevoUsuario: function (req, res) {

        let newUser  = {            
            usuario: req.body.name,
            password: req.body.pass,
            address: req.body.domicilio,
            zipcode: req.body.zipcode,
            email: req.body.email
        }

        users.push(newUser);
        let usersJSON = JSON.stringify(users);
        fs.writeFileSync(usersFilePath, usersJSON);

        res.redirect("/")
    },

    login: function (req, res) {
        res.render("login");
    },

    carrito: function (req, res) {
        res.render("carrito");
    }
}

module.exports = mainController;
