const mongoose=require('mongoose')
 
const periodSchema=mongoose.Schema({
    plantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
    },
    systemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'System'
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    }
})
 module.exports=mongoose.model('Period',periodSchema);