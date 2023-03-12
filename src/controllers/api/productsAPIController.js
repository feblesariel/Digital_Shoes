const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const Producto = db.Producto;


const productsAPIController = {
    list: (req, res) => {
        Producto.findAll({ attributes: ['id', 'nombre', 'precio','descripcion', 'id_categoria']})
            .then(productos => {
                let respuesta = {
                    count: productos.length,
                    data: productos
                }
                res.json(respuesta);
            })
    },

    detail: (req, res) => {
        Producto.findByPk(req.params.id, { attributes: ['id', 'nombre','precio','descripcion']})
            .then(producto => {
                let respuesta = {
                    detail: producto
                }
                res.json(respuesta);
            });
    }

}

module.exports = productsAPIController;