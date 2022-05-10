const mainController = {

    home: function (req, res) {
        res.render("home");
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