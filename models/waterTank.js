const mongoose = require('mongoose')

const waterSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    nameTank: {
        type: String,
        required: true,
    },
    amountTank: {
        type: Number,
        required: true
    },
    maxTank: {
        type: Number,
        required: true
    },
    minTank: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('WaterTank', waterSchema);