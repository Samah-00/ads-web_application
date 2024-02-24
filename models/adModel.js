const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Ad extends Model {}
    Ad.init({
        title: {
            type: DataTypes.STRING(20), // Limiting length to 20 characters
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200), // Limiting length to 200 characters
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^\d{2,3}-\d{7}$/   // Validating format as XXX-XXXXXXX or XX-XXXXXXX where X is a digit
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Ad',
        timestamps: true, // add createdAt and updatedAt fields
    });
    return Ad;
};
