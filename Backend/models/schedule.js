const mongoose = require("mongoose");
const schema = mongoose.Schema;

const coachScheduleSchema = new schema({
  TimeSlot: {
    type: String,
    required: true,
  },

  Day: {
    type: String,
    required: true,
  },

  Trainer: {
    type: String,
    required: true,
    
  },
});

const customerScheduleSchema = new schema({
  Date: {
    type: String,
    required: true,
  },
  TimeSlot: {
    type: String,
    required: true,
  },
  Section: {
    type: String,
    required: true,
  },
});

const CoachSchedule = mongoose.model("CoachSchedule", coachScheduleSchema);
const CustomerSchedule = mongoose.model("CustomerSchedule",customerScheduleSchema);
module.exports = { CoachSchedule, CustomerSchedule };
