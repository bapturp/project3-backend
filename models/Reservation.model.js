const { Schema, model } = require('mongoose');

const reservationSchema = new Schema(
  {
    serviceItem: {
      type: [Schema.Type.ObjectID],
      ref: 'ServiceItem',
      required: true,
    },
    consumer: {
      type: Schema.Type.ObjectID,
      ref: 'User',
      required: true,
    },
    provider: {
      type: Schema.Type.ObjectID,
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
