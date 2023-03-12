module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER(1),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(10),
            allowNull: true
        }
    };
    let config = {
        tableName: "categoria",
        timestamps: false
    }

    const Categoria = sequelize.define(alias, cols, config); 

    Categoria.associate = function (models) {

        Categoria.hasMany(models.Producto, {
            as: "producto",
            foreignKey: "id"
        });

    }

    return Categoria;
};