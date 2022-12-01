const { Schema, model } = require('mongoose');

const serviceSchma = new Schema(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture_url: {
      type: String,
      required: false,
    },
    location: {
      type: { type: String },
      coordinates: [Number],
    },
    tags: {
      type: [Schema.Types.ObjectId],
      ref: 'Tag',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Service = model('Service', serviceSchma);

module.exports = Service;
