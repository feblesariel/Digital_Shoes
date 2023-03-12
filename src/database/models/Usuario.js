module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER(5),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        contraseña: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        nombre: {
            type: dataTypes.STRING(15),
            allowNull: true
        },
        domicilio: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        zipcode: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        imagen: {
            type: dataTypes.STRING(100)
        },
        rol_id: {
            type: dataTypes.INTEGER(1),
            defaultValue: 1
        }
    };
    let config = {
        tableName: "usuario",
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config); 

    Usuario.associate = function (models) {

        Usuario.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rol_id"
        });

        Usuario.belongsTo(models.Orden, {
            as: "orden",
            foreignKey: "id"
        });

    }

    return Usuario;
};