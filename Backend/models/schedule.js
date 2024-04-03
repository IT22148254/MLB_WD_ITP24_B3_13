const mongoose = require("mongoose");
const schema = mongoose.Schema;

const scheduleSchema = new schema({
  TimeSlot: {
    type: String,
    required: true,
  },

  Day: {
    type: String,
    required: true,
  },

  Trainer: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
