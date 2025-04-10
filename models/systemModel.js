const mongoose=require('mongoose')
 
const systemSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    amountWater:{
        type:Number,
        require:true
    },
    IrrigationEvery:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    }
})
 module.exports=mongoose.model('System',systemSchema);