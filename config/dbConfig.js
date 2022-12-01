const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  console.log('Environment variable MONGODB_URI is missing or empty.');
  return;
}
const endpoint = process.env.MONGODB_URI;

const mongoConnection = async () => {
  try {
    const {
      connection: { host, port, name },
    } = await mongoose.connect(endpoint);
    console.log(`DB ${name} on host ${host}:${port} connected.`);
  } catch (error) {
    console.error(error);
  }
};

mongoConnection();
