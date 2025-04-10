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
        require:true
    },
    status:{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('Plant', plantSchema);

