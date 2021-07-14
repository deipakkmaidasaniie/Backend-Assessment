const mongoose=require('mongoose');
const categorySchema=mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
})
module.exports=mongoose.model("Category",categorySchema);