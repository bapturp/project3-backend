const { Schema, model } = require('mongoose');

const serviceItemSchema = new Schema(
  {
    service: {
      type: [Schema.Type.ObjectID],
      ref: 'Service',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('ServiceItem', serviceItemSchema);
