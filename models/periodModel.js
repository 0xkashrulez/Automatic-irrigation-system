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
        require:true
    },
    endDate:{
        type:String,
        require:true
    }
})
 module.exports=mongoose.model('Period',periodSchema);