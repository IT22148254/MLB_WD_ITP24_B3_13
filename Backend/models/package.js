const mongoose = require("mongoose");
const schema = mongoose.Schema;

const packageSchema = new schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  Discription: {
    type: String,
  },
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
