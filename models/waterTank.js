const mongoose = require('mongoose')

const waterSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    nameTank: {
        type: String,
        require: true,
    },
    amountTank: {
        type: Number,
        require: true
    },
    maxTank: {
        type: Number,
        require: true
    },
    minTank: {
        type: Number,
        require: true
    }
})
module.exports = mongoose.model('WaterTank', waterSchema);