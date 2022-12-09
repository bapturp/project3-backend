const router = require('express').Router();
const User = require('../models/User.model');
const protectRoute = require('../middlewares/protectRoute');
const uploader = require('./../config/cloudinary');

// CATCH NEWS INFORMATIONS AND UPDATE USER //

router.post('/profile', protectRoute, uploader.single('pictureFile'), async (req, res) => {
  const { firstName, lastName, street, city, postcode, username, email, prefix, number, age } = req.body;

  try {
    let userUpdate;
    if (req.file) {
      userUpdate = await User.findByIdAndUpdate(
        req.userId,
        {
          username,
          email,
          firstName,
          lastName,
          address: { city, street, postcode },
          phone: { prefix, number },
          age,
          image: {
            name: req.file.originalname,
            url: req.file.path,
          },
        },
        { new: true },
      );
    } else {
      userUpdate = await User.findByIdAndUpdate(
        req.userId,
        {
          username,
          email,
          firstName,
          lastName,
          address: { city, street, postcode },
          phone: { prefix, number },
          age,
        },
        { new: true },
      );
    }
    await userUpdate.save();
    res.redirect('/');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/profile', protectRoute, async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.userId);
    // await req.session.destroy();
    res.redirect('/');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
