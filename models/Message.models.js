const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Message = model('Message', messageSchema);

module.exports = Message;
