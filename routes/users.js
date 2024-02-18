// ------- Require Section -------
const express = require('express');

const { User } = require('../db'); // Import User model from db.js

const router = express.Router();

// ------- User Routes -------
// Login
router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ where: { login, password } });
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid login credentials' });
  }
});

// Logout (not much to do in this example since HTTP is stateless)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Get all users
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
