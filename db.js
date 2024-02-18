const { Sequelize } = require('sequelize');

// Connect to the database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

sequelize.authenticate().then(() => {
    console.log('Connection to database has been established successfully.');
}).catch((err) => {
    console.log(err);
});

// Import Ad model
const Ad = require('./models/adModel')(sequelize);

Ad.sync({ alter: true }).then(() => {
    console.log("Ads table is up");
}).catch((error) => {
    console.log(`Failed to connect to Ads table. Error: ${error}`);
});

module.exports = { sequelize, Ad };
