module.exports = (sequelize, dataTypes) => {
    let alias = 'Orden';
    let cols = {
        id: {
            type: dataTypes.INTEGER(5),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER(5),
            allowNull: true
        },
        id_product: {
            type: dataTypes.INTEGER(5),
            allowNull: true
        },
        cantidad: {
            type: dataTypes.INTEGER(1),
            allowNull: true
        },
        precio: {
            type: dataTypes.DOUBLE(8,2),
            allowNull: true
        }
    };
    let config = {
        tableName: "orden",
        timestamps: false
    }

    const Orden = sequelize.define(alias, cols, config); 

    Orden.associate = function (models) {

        Orden.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id_product"
        });

        Orden.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "id_user"
        });

    }

    return Orden;
};