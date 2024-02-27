const express = require('express');
const {User} = require("../db");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Get message from session or default to false
  const message = req.session.message || false;
  // Clear message from session after retrieving it
  req.session.message = false;
  res.render('index', { message });
});

router.get('/post-new-ad', (req, res) => {
  res.render('post-new-ad');
});

// Login page
router.get('/login', (req, res) => {
  let message = '';
  if(req.query.unauthorized)
    message = 'You are unauthorized. Please log in.';
  else if(req.session.message)
    message = 'Invalid login credentials';
  req.session.message = false;
  res.render('login-page', { message });
});

// Login
router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ where: { login, password } });
  if (user) {
    req.session.user = user;
    res.render('admin-page')
  } else {
    req.session.message=true;
    res.status(401).redirect('/login');
  }
});

// Logout
router.post('/logout', (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      // Handle failure case
      res.render('error-page',{ Title: 'Error', message: 'failed to logout 😣', code: 500});
    } else {
      // Redirect to home page
      res.redirect('/');
    }
  });
});

// Middleware to check if the user is authenticated
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

router.get('/admin-page', requireLogin, (req, res) => {
  res.render('admin-page');
});

module.exports = router;