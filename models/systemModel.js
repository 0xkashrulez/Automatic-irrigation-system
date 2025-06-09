const mongoose = require('mongoose');

const systemSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amountWater: {
    type: Number,
    required: true
  },
  irrigationEvery: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  humidity: {
    type: String,
    required: true,
    default: '50'
  },
  plantsCount: {
    type: Number,
    default: 0
  },
  plants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  }]
}, { timestamps: true });

module.exports = mongoose.model('System', systemSchema);
