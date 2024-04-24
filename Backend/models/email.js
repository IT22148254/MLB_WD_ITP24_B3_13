const mongoose = require("mongoose");
const schema = mongoose.Schema;

const emailSchema = new schema({
  title:{
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: Number,
    required: true,
  },
});

const MEmail = mongoose.model("MEmail", emailSchema);
module.exports = MEmail;