const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  startTimestamp: {
    type: String,
    required: true,
  },
  endTimestamp: {
    type: String,
    required: true,
  },
  coordinatesCovered: [{
    latitude: {
      type: Float,
      required: true,
    },
    longitude: {
      type: Float,
      required: true,
    },
  }],
  issues:[{
    type:mongoose.Schema.ObjectId,
    ref:"Issue"
  }]
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
