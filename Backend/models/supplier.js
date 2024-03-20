const mongoose = require("mongoose");
const schema = mongoose.Schema;

const supplierSchema = new schema({
    Name:{
        type:String,
        required:true
    },
    Product:{
        type:String,
        required:true
    },
    UnitPrice:{
        type:Number,
        required:true
    },
    BrandName:{
        type:String,
        required:true
    },
    PurchasedAmnt:{
        type:Number,
        required:true
    }
})

const Supplier =mongoose.model("Supplier",supplierSchema);
module.exports = Supplier;