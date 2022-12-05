require('dotenv').config();
require('../config/dbConfig');

const mongoose = require('mongoose');

// models
const User = require('../models/User.model');
const Reservation = require('../models/Reservation.model');
const Service = require('../models/Service.model');
const ServiceItem = require('../models/ServiceItem.model');
const Tag = require('../models/Tag.model');
const Message = require('../models/Message.models');
const Conversation = require('../models/Conversation.models');

// seeds
const tagSeed = require('./tag.seeds.json');
const userSeed = require('./user.seeds.json');
const servicesSeed = require('./services.seed.json');
const reservationsSeed = require('./reservations.seed.json');
const conversationsSeed = require('./conversations.seed.json');

const cleanUp = async () => {
  try {
    await Message.deleteMany();
    await Conversation.deleteMany();
    await Reservation.deleteMany();
    await ServiceItem.deleteMany();
    await Service.deleteMany();
    await Tag.deleteMany();
    await User.deleteMany();
  } catch (error) {
    console.error(error);
  }
};

const seedingTags = async () => {
  try {
    await Tag.create(tagSeed);
  } catch (error) {
    console.error(error);
  }
};

const seedingUsers = async () => {
  try {
    await User.create(userSeed);
  } catch (error) {
    console.error(error);
  }
};

const seedingServices = async () => {
  try {
    for (let { serviceItems, provider, title, description, location, tags } of servicesSeed) {
      const { _id: providerId } = await User.findOne({ username: provider }, { _id: 1 });

      const tagsId = (await Tag.find({ tagName: { $in: tags } }, { _id: 1 })).map((e) => e._id);
      console.log(tagsId);

      const { _id: createdService } = await Service.create({
        title: title,
        description: description,
        tags: tagsId,
        location,
        provider: providerId,
      });

      for (let { startDate, endDate, price } of serviceItems) {
        await ServiceItem.create({ startDate, endDate, price, service: createdService });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const seedingReservations = async () => {
  try {
    for (let { serviceItems, consumer: consumerName, provider: providerName } of reservationsSeed) {
      const { _id: serviceItemId } = await ServiceItem.findOne({ startDate: serviceItems[0].startDate });
      const consumer = await User.findOne({ username: consumerName });
      const provider = await User.findOne({ username: providerName });
      await Reservation.create({ consumer, provider, serviceItem: [serviceItemId] });
    }
  } catch (error) {
    console.error(error);
  }
};

const seedingConversations = async () => {
  try {
    for (let { participants, service, messages } of conversationsSeed) {
      const { _id: serviceId } = await Service.findOne({ title: service }, { _id: 1 });

      const participantsId = (
        await User.find({ $or: [{ username: participants[0] }, { username: participants[1] }] }, { _id: 1 })
      ).map((e) => e._id);

      const { _id: conversationId } = await Conversation.create({ participants: participantsId, service: serviceId });

      for (let { sender, content } of messages) {
        const { _id: senderId } = await User.findOne({ username: sender }, { _id: 1 });
        await Message.create({ sender: senderId, content, conversation: conversationId });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const seeding = async () => {
  try {
    await cleanUp();
    await seedingUsers();
    await seedingTags();
    await seedingServices();
    await seedingReservations();
    await seedingConversations();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

seeding();
