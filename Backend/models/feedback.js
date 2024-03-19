const mongoose = require("mongoose");
const schema = mongoose.Schema;

const feedBackSchema = new schema({
  UserName: {
    type: String,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
});

const FeedBack = mongoose.model("FeedBack", feedBackSchema);
module.exports = FeedBack;
