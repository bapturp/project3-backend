const { Schema, model } = require('mongoose');

const serviceItemSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
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

const ServiceItem = model('ServiceItem', serviceItemSchema);

module.exports = ServiceItem;
