// ------- Require Section -------
const express = require('express');
const { Sequelize } = require('sequelize');

const router = express.Router();

// connect to the database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

sequelize.authenticate().then(()=>{
    console.log('Connection to database has been established successfully.');
})
    .catch((err)=>{
        console.log(err);
    })

// Import Ad model
const Ad = require('../models/adModel')(sequelize);
Ad.sync({ alter: true }).then(() => {
    console.log("Ads table is up");
}).catch((error) => {
    console.log(`Failed to connect to Ads table. Error: ${error}`);
});

// ------- Ad routes -------

// Get all ads
router.get('/', async (req, res) => {
    try {
        const ads = await Ad.findAll();
        res.json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get approved ads
router.get('/approved', async (req, res) => {
    try {
        const approvedAds = await Ad.findAll({
            where: {
                approved: true
            }
        });
        res.json(approvedAds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Post a new ad
router.post('/', async (req, res) => {
    try {
        const newAd = await Ad.create(req.body);
        res.status(201).json(newAd);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            res.status(400).json({ error: `Bad Request: ${error}` });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Update an ad (change approved to true)
router.put('/:id', async (req, res) => {
    const adId = req.params.id;
    try {
        const ad = await Ad.findByPk(adId);
        if (!ad) {
            return res.status(404).json({ error: 'Ad not found' });
        }
        ad.approved = true;
        await ad.save();
        res.json(ad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an ad
router.delete('/:id', async (req, res) => {
    const adId = req.params.id;
    try {
        const ad = await Ad.findByPk(adId);
        if (!ad) {
            return res.status(404).json({ error: 'Ad not found' });
        }
        await ad.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
