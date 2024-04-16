const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  Fname: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Dob: {
    type: Date,
  },
  AccLevel: {
    type: String,
    required: true,
    default: "customer",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
