module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER(3),
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        contraseña: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        nombre: {
            type: dataTypes.STRING(20),
            allowNull: true
        },   
        domicilio: {
            type: dataTypes.STRING(50),
        },
        zipcode: {
            type: dataTypes.STRING(20),
        },
        imagen: {
            type: dataTypes.STRING(100),
        },
        admin: {
            type: dataTypes.BOOLEAN, defaultValue: false
        }  
    };
    let config = {
        tableName: "usuario",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config); 

    return User;
};