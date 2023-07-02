const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  photo: {
    type:String,
    required:true

  },
  description: {
    type: String,
    required: true,
  },
  position: {
    latitude: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    longitude: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    }
  }
});

const Issue = mongoose.model('issue', issueSchema);

module.exports = Issue;
