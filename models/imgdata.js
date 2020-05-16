const mongoose = require('mongoose');

const { Schema } = mongoose;

const DataSchema = new Schema(
  {
    img:
        { data: Buffer, contentType: String },
  },
);

module.exports = mongoose.model('Image', DataSchema);
