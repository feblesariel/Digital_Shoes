const mainController = {

    home: function (req, res) {
       const shoes=[
            {
                nombre:'Air Jordan',
                precio:'$1850.00',
                imagen:'<img src="./images/zapatillas-Air-Jordan.png" class="product-img" alt="">'
            },
            {
                nombre:'Air Max',
                precio:'$1600.00',
                imagen:'<img src="./images/zapatillas-nike-air-max_ccexpress.png" class="product-img" alt="">'
            },
            {
                nombre:'Nike Blue',
                precio:'$2050.00',
                imagen:'<img src="./images/zapatillas-nike-azul.png" class="product-img" alt="">'
            },
            {
                nombre:'Flywire',
                precio:'$2250.00',
                imagen:'<img src="./images/zapatillas-nike-flywire.png" class="product-img" alt="">'
            },
            {
                nombre:'Zapatillas',
                precio:'$2000.00',
                imagen:'<img src="./images/zapatillas.png" class="product-img" alt="">'
            }
            
            ]
        
        res.render("home",{shoes:shoes});
    },
    product: function (req, res) {
        res.render("product");
    },
    register: function (req, res) {
        res.render("register");
    },

    login: function (req, res) {
        res.render("login");
    },
    carrito: function (req, res) {
        res.render("carrito");
    }
}

module.exports = mainController;
