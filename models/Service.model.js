const { Schema, model } = require('mongoose');

const serviceSchma = new Schema(
  {
    provider: {
      type: Schema.Type.ObjectID,
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
      type: Location,
      required: true,
    },
    tag: {
      type: [Schema.Type.ObjectID],
      ref: 'Tag',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
