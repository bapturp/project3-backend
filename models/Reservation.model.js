const { Schema, model } = require('mongoose');

const reservationSchema = new Schema(
  {
    serviceItem: {
      type: [Schema.Types.ObjectId],
      ref: 'ServiceItem',
      required: true,
    },
    consumer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Reservation = model('Reservation', reservationSchema);
module.exports = Reservation;
