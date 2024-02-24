const express = require('express');
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

router.get('/users', (req, res) => {
  res.render('admin-page');
});

module.exports = router;
