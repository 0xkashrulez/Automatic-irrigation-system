const mongoose=require('mongoose')
 
const systemSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amountWater:{
        type:Number,
        required:true
    },
    IrrigationEvery:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})
 module.exports=mongoose.model('System',systemSchema);