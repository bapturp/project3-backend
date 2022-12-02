const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.type.ObjectID,
    ref: 'User',
    required: true,
  },
  read: {
    type: Boolean,
  },
});

const Message = model('Message', messageSchema);

module.exports = Message;
