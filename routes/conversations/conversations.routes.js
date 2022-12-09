const router = require('express').Router();
const protectRoute = require('../../middlewares/protectRoute');
const Conversation = require('../../models/Conversation.models');
const Message = require('../../models/Message.models');
const conversationAggregate = require('./conversationAggregate');
//PROTECT ROUTE
router.get('/', protectRoute, async (req, res, next) => {
  try {
    const data = await Conversation.aggregate(conversationAggregate(req.userId));

    // let data = await Conversation.find({ participants: { $in: req.userId } })
    //   .populate('service', 'title')
    //   .populate('participants', 'username');
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', protectRoute, async (req, res, next) => {
  try {
    const { serviceProvider: userB, service } = req.body;
    const userA = req.userId;

    const result = await Conversation.create({ participants: [userA, userB], service });

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

// TODO implement limit and pagination
router.get('/:conversationId', protectRoute, async (req, res, next) => {
  try {
    const conversation = req.params.conversationId;
    const data = await Message.find({ conversation }).sort({ timestamps: 1 }).populate('sender', 'username');
    return res.json(data);
  } catch (error) {
    return next(error); //// ERROR HANDLING
  }
});

router.post('/:conversationId', protectRoute, async (req, res, next) => {
  try {
    const conversation = req.body.conversationId;
    const sender = req.userId;

    // TODO implement post converstion
    console.log('conversationId POST is not fully implemented');
    console.log('req.body:' + req.body);
    // const content = req.body;

    const data = await Message.create({ conversation, sender, content });

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
