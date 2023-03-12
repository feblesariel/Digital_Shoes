const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const Usuario = db.Usuario;


const usersAPIController = {
    list: (req, res) => {
        Usuario.findAll({ attributes: ['id', 'nombre', 'email', 'rol_id']})
            .then(usuarios => {
                let respuesta = {
                    count: usuarios.length,
                    users: usuarios
                }
                res.json(respuesta);
            })
    },

    detail: (req, res) => {
        Usuario.findByPk(req.params.id, { attributes: ['id', 'nombre', 'email', 'domicilio', 'zipcode', 'imagen']})
            .then(usuario => {
                let respuesta = {       
                    detail: usuario
                }
                res.json(respuesta);
            });
    }

}

module.exports = usersAPIController;