module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
    let cols = {
        id: {
            type: dataTypes.INTEGER(1),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(15),
            allowNull: true
        }
    };
    let config = {
        tableName: "rol",
        timestamps: false
    }

    const Rol = sequelize.define(alias, cols, config); 

    Rol.associate = function (models) {
        Rol.hasMany(models.Usuario, {
            as: "usuarios",
            foreignKey: "id"
        });
    }

    return Rol;
};