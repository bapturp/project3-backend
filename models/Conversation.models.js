const { Schema, model } = require('mongoose');

const conservationSchema = new Schema({
  participants: {
    type: [Schema.Type.ObjectID],
    ref: 'User',
  },
  service: {
    type: Schema.Type.ObjectID,
    required: true,
  },
});

const Conversation = model('Conversation', conservationSchema);
module.exports = Conversation;
