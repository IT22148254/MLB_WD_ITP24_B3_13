const mongoose = require("mongoose");
const schema = mongoose.Schema;

const serviceFeedBackSchema = new schema({
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
  Email: {
    type: String,
    required: true,
  },
});

const coachFeedBackSchema = new schema({
  UserName: {
    type: String,
    required: true,
  },
  Coach: {
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
  Email: {
    type: String,
    required: true,
  },
});

const ServiceFeedBack = mongoose.model(
  "ServiceFeedBack",
  serviceFeedBackSchema
);
const CoachFeedBack = mongoose.model("CoachFeedBack", coachFeedBackSchema);

module.exports = { ServiceFeedBack, CoachFeedBack };
