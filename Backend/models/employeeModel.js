const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  fullName: { type: String, required: true },
  nic: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee };
