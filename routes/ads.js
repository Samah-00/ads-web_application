// ------- Require Section -------
const express = require('express');
const { Sequelize } = require('sequelize');

const { Ad } = require('../db'); // Import Ad model from db.js

const router = express.Router();
// ------- Ad routes -------

// Get approved ads sorted by update time (newer ad first)
router.get('/approved', async (req, res) => {
    try {
        const approvedAds = await Ad.findAll({
            where: {
                approved: true
            },
            order: [['updatedAt', 'DESC']] // Sort by updatedAt timestamp in descending order
        });
        res.json(approvedAds);
    } catch (error) {
        res.status(500).render('error-page',{ Title: 'Error', message: 'Internal Server Error 💔', code: 500});
    }
});

// Get an ad by ID, route is used to check if an ad was updated (approved)
router.get('/:id', async (req, res) => {
    const adId = req.params.id;
    try {
        const ad = await Ad.findByPk(adId);
        if (!ad) {
            // If the ad is not found, send a 404 response
            return res.status(404).json({ message: 'Ad not found' });
            // res.status(404).render('error-page',{ Title: 'Error', message: 'Ad not found 👀', code: 404});
        }
        // If the ad is found, send it in the response
        res.json(ad);
    } catch (error) {
        // Handle server errors with a 500 response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Post a new ad
router.post('/', async (req, res) => {
    try {
        // Add new ad to the db
        const newAd = await Ad.create(req.body);
        // set message to true in order to show success message in frontend
        req.session.message = true;
        // Set adId to the newly created ad's ID
        const adId = newAd.id;
        // Redirect to the index page with adId as a query parameter
        res.status(201).redirect(`/?adId=${adId}`);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            res.status(400).render('error-page',{ Title: 'Error', message: `Bad Request: ${error}`, code: 400});
        } else {
            res.status(500).render('error-page',{ Title: 'Error', message: 'Internal Server Error 💔', code: 500});
        }
    }
});

// Middleware to check if the user is authenticated
function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

// Get all ads sorted by update time (newer ad first)
router.get('/', requireLogin, async (req, res) => {
    try {
        const ads = await Ad.findAll({
            order: [['updatedAt', 'DESC']] // Sort by updatedAt timestamp in descending order
        });
        res.json(ads);
    } catch (error) {
        res.status(500).render('error-page',{ Title: 'Error', message: 'Internal Server Error 💔', code: 500});

    }
});

// Update an ad (change approved to true)
router.put('/:id', requireLogin, async (req, res) => {
    const adId = req.params.id;
    try {
        const ad = await Ad.findByPk(adId);
        if (!ad) {
            res.status(404).render('error-page',{ Title: 'Error', message: 'Ad not found 👀', code: 404});
        }
        ad.approved = true;
        await ad.save();
        res.json(ad);
    } catch (error) {
        res.status(500).render('error-page',{ Title: 'Error', message: 'Internal Server Error 💔', code: 500});

    }
});

// Delete an ad
router.delete('/:id', requireLogin, async (req, res) => {
    const adId = req.params.id;
    try {
        const ad = await Ad.findByPk(adId);
        if (!ad) {
            res.status(404).render('error-page',{ Title: 'Error', message: 'Ad not found 👀', code: 404});
        }
        await ad.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).render('error-page',{ Title: 'Error', message: 'Internal Server Error 💔', code: 500});
    }
});

module.exports = router;
