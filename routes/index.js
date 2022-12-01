const router = require('express').Router();
const protectRoute = require('../middlewares/protectRoute');

// All the routes are prefixed with `/api/v1`
router.get('/', (req, res, next) => {
  res.send('Server is running... 🏃‍♂️');
});

router.get('/private', protectRoute, (req, res, next) => {
  res.send('Protection passed !');
});

module.exports = router;
