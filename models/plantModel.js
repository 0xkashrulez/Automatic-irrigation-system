const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  systemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'System',
    required: true
  },
  humidity: {
    type: String,
    required: true,
    default: '50'  // قيمة ابتدائية لو مش جايه من اليوزر
  },
  status: {
    type: String,
    required: true,
    default: 'normal'  // حالة ابتدائية
  }
}, { timestamps: true });

module.exports = mongoose.model('Plant', plantSchema);
