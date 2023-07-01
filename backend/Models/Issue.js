const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  photo: {
    type:URL,
    required:true

  },
  description: {
    type: String,
    required: true,
  },
  position: {
    latitude: {
      type: Float,
      required: true,
    },
    longitude: {
      type: Float,
      required: true,
    }
  }
});

const Issue = mongoose.model('issue', sessionSchema);

module.exports = Issue;
