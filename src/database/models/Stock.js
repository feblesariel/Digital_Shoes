module.exports = (sequelize, dataTypes) => {
    let alias = 'Stock';
    let cols = {
        id: {
            type: dataTypes.INTEGER(5),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        unidades: {
            type: dataTypes.INTEGER(3),
            allowNull: true
        },
        id_product: {
            type: dataTypes.INTEGER(5),
            allowNull: true
        }
    };
    let config = {
        tableName: "stock",
        timestamps: false
    }

    const Stock = sequelize.define(alias, cols, config); 

    Stock.associate = function (models) {

        Stock.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id_product"
        });

    }

    return Stock;
};