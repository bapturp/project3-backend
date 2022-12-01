require('dotenv').config();
require('../config/dbConfig');

const mongoose = require('mongoose');
const User = require('../models/User.model');
const userSeed = require('./user.seeds.json');

// const Tag = require('../models/Tag.model');
// const tagSeed = require('./tag.seeds.json');

// const Reservation = require('../models/Reservation.model');
// const Service = require('../models/Service.model');
// const ServiceItem = require('../models/ServiceItem.model');

const seeding = async () => {
  try {
    const deletedUsers = await User.deleteMany();
    console.log(`Deleted users: ${deletedUsers.length}`);

    const createdUsers = await User.create(userSeed);
    console.log(`Created users: ${createdUsers.length}`);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

seeding();
