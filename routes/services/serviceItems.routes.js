const router = require('express').Router();
const protectRoute = require('../../middlewares/protectRoute');
// const Service = require('../../models/Service.model');
const ServiceItem = require('../../models/ServiceItem.model');

// from api/v1/services/serviceId/serviceItems
router.get('/', protectRoute, async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const serviceItems = await ServiceItem.find({
      _id: { $in: [serviceId] },
    });
    res.status(200).json(serviceItems);
  } catch (error) {
    next(error);
  }
});

router.get('/:serviceItemId', protectRoute, async (req, res, next) => {
  try {
    const { serviceId, serviceItemId } = req.params;
    const serviceItem = await ServiceItem.find({
      $and: [
        {
          _id: { $in: [serviceItemId] },
        },
        { service: serviceId },
      ],
    });

    res.status(200).json(serviceItem); //.populate('Service').populate('User'); //req.payload //filter on not this user/payload
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { startDate, endDate, price } = req.body;
  const { serviceId } = req.params;

  const student = await ServiceItem.create({
    service: serviceId,
    startDate,
    endDate,
    price,
  });

  res.status(201).json(student);
});

module.exports = router;
