const router = require('express').Router();
const protectRoute = require('../../middlewares/protectRoute');
const Conversation = require('../../models/Conversation.models');
const Message = require('../../models/Message.models');

router.get('/', protectRoute, async (req, res, next) => {
  try {
    data = await Conversation.find({ participants: { $in: req.userId } });
    console.log(data);
    if (!data) return res.sendStatus(404);
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
router.get('/:coversationId', protectRoute, async (req, res, next) => {
  try {
    const conversation = req.body.coversationId;
    const data = await Message.find({ conversation }).sort({ timestamps: 1 });
    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

router.post('/:coversationId', protectRoute, async (req, res, next) => {
  try {
    const conversation = req.body.coversationId;
    const sender = req.userId;
    const content = req.body;

    const data = await Message.create({ conversation, sender, content });

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
