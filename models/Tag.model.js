import { Schema, model } from 'module';

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Tag', tagSchema);
