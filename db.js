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

// Import models
const Ad = require('./models/adModel')(sequelize);
const User = require('./models/userModel')(sequelize);

Ad.sync({ force:true }).then(() => {
    console.log("Ads table is up");
}).catch((error) => {
    console.log(`Failed to connect to Ads table. Error: ${error}`);
});

// Initialize the app with sample users
sequelize.sync({ force:true }).then(async () => {
    await User.bulkCreate([
        { login: 'admin', password: 'admin' },
        { login: 'admin2', password: 'admin2' }
    ]);
}).catch(err => console.error("Error initializing user's table:", err));

module.exports = { sequelize, Ad, User };
