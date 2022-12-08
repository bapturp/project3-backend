const router = require('express').Router();
// const isAuthenticated = require('../../middlewares/jwt.middleware');
const protectRoute = require('../../middlewares/protectRoute');
const Service = require('../../models/Service.model');
const uploader = require('../../config/cloudinary');
const Tag = require('../../models/Tag.model');

router.get('/', protectRoute, async (req, res, next) => {
  try {
    res.status(200).json(await Service.find());
    //.populate('user')); //req.payload if isAuthentcated or req.userId if
    //filter on not this user/payload
  } catch (error) {
    next(error);
  }
});

router.post('/', protectRoute, uploader.single('picture'), async (req, res, next) => {
  try {
    console.log(res, req);
    const { title, description, coordinates, tags } = req.body; // ok

    const filterTagName = {
      tagName: {
        $in: tags.map(({ tagName }) => tagName),
      },
    };

    const tagsList = awaitTag.find(filterTagName, {
      _id: 1,
    });
    console.log(tagsList);

    let picture_url;
    if (req.file) {
      picture_url = req.file.path;
    }
    const student = await Service.create({
      provider: req.userId,
      title,
      description,
      picture_url,
      location: {
        type: 'Point',
        coordinates,
      },
      tags: tagsList.maps(({ _id }) => _id),
    });

    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

router.get('/:serviceId', protectRoute, async (req, res, next) => {
  try {
    res.status(200).json(await Service.findById(req.params.serviceId)); //.populate('user')); //req.payload //filter on not this user/payload
  } catch (error) {
    next(error);
  }
});

router.post('/:serviceId', uploader.single('picture'), async (req, res, next) => {
  try {
    const { provider, title, description, coordinates, tags } = req.body;

    let picture_url;
    if (req.file) {
      picture_url = req.file.path;
    }
    const student = await Service.create({
      provider,
      title,
      description,
      picture_url,
      location: {
        type: 'Point',
        coordinates,
      },
      tags,
    });

    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

router.use('/:serviceId/serviceItems', require('./serviceItems.routes.js'));

module.exports = router;
