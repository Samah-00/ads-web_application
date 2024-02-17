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

    // Initialize the app with sample users
    sequelize.sync({ alter: true }).then( async () => {
        await User.bulkCreate([
            { login: 'admin', password: 'admin' },
            { login: 'admin2', password: 'admin2' }
        ]);
    }).catch (err => console.error("Error initializing user's table:", err));

    return User;
};
