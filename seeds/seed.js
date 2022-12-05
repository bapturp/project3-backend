require('dotenv').config();
require('../config/dbConfig');

const mongoose = require('mongoose');

// models
const User = require('../models/User.model');
const Reservation = require('../models/Reservation.model');
const Service = require('../models/Service.model');
const ServiceItem = require('../models/ServiceItem.model');
const Tag = require('../models/Tag.model');

// seeds
const tagSeed = require('./tag.seeds.json');
const userSeed = require('./user.seeds.json');
const servicesSeed = require('./services.seed.json');

const seedingtags = async () => {
  try {
    const deletedTags = await Tag.deleteMany();
    console.log(`Deleted tags: ${deletedTags.deletedCount}`);

    const createdTags = await Tag.create(tagSeed);
    console.log(`Created tags: ${createdTags.length}`);
  } catch (error) {
    console.error(error);
  }
};

const seedingUsers = async () => {
  try {
    const deletedUsers = await User.deleteMany();
    console.log(`Deleted users: ${deletedUsers.deletedCount}`);

    const createdUsers = await User.create(userSeed);
    console.log(`Created users: ${createdUsers.length}`);
  } catch (error) {
    console.error(error);
  }
};

const seedingServicesConversations = async () => {
  try {
    deletedService = await Service.deleteMany();
    for (let service of servicesSeed) {
      const { _id: providerId } = (await User.find({ username: service.provider }, { _id: 1 }))[0];
      const consumerId = await User.find({ username: service.consumer })[0];

      const tags = await Tag.find({ $in: service.tags });

      const createdService = await Service.create({
        title: service.title,
        description: service.description,
        tags,
        location: service.location,
        provider: providerId,
      });
      console.log(createdService);
      for (let { startDate, endDate, price } of service.serviceItems) {
        await ServiceItem.create({ startDate, endDate, price });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const seeding = async () => {
  try {
    await seedingUsers();
    await seedingtags();
    await seedingServicesConversations();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

seeding();
