module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER(3),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(20),
            allowNull: true
        },
        precio: {
            type: dataTypes.DOUBLE(8,2),
            allowNull: true
        },
        imagen: {
            type: dataTypes.STRING(100)
        },   
        descripcion: {
            type: dataTypes.STRING(300)
        }
    };
    let config = {
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config); 

    return Product;
};