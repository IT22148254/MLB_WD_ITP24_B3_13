const mongoose = require("mongoose");
const studSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
});
const students = new mongoose.model("pay_details",studSchema);
module.exports = students;