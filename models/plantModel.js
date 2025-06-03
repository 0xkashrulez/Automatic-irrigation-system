const mongoose=require('mongoose')

const plantSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    systemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'System'
    },
    humidity:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Plant', plantSchema);

