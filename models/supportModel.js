const mongoose = require('mongoose')

const supportSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    }
})
module.exports = mongoose.model('Support', supportSchema)