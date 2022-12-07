const { Schema, model } = require('mongoose');

const conservationSchema = new Schema({
  participants: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
});

const Conversation = model('Conversation', conservationSchema);
module.exports = Conversation;
