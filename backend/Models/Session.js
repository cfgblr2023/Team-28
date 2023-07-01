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
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    longitude: {
      type: mongoose.Schema.Types.Decimal128,
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
