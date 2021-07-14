const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    qtyPerUnit:Number,
    unitPrice:Number,
    unitInstock:Number,
    discontinued:Boolean,
    categoryId:{
        type:Number,
        ref:'Category'
    }
})

module.exports=mongoose.model("Product",productSchema);