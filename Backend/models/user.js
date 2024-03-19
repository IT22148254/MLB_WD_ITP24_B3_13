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
});

const User = mongoose.model("User", userSchema);
module.exports = User;
