const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
};
