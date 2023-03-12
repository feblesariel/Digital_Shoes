module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto';
    let cols = {
        id: {
            type: dataTypes.INTEGER(5),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        precio: {
            type: dataTypes.DOUBLE(8,2),
            allowNull: true
        },
        descripcion: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        imagen: {
            type: dataTypes.STRING(100)
        }, 
        id_categoria: {
            type: dataTypes.INTEGER(1),
            allowNull: true
        }
    };
    let config = {
        tableName: "producto",
        timestamps: false
    }

    const Producto = sequelize.define(alias, cols, config); 

    Producto.associate = function (models) {

        Producto.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "id_categoria"
        });

        Producto.belongsTo(models.Stock, {
            as: "stock",
            foreignKey: "id"
        });

        Producto.belongsTo(models.Orden, {
            as: "orden",
            foreignKey: "id"
        });

    }

    return Producto;
};