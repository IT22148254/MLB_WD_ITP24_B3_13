const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const userSchema = new schema({
  Fname: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
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
    unique: true,
  },
  Password: {
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
  Package: {
    type: schema.Types.ObjectId,
    default: "",
    ref: "Package",
  },
  PrPackage: {
    type: schema.Types.ObjectId,
    default: "",
    ref: "PromoPackage",
  },
  CustomerSchedule: {
    type: schema.Types.ObjectId,
    default: "",
    ref: "CustomerSchedule",
  },
  CoachSchedule: {
    type: schema.Types.ObjectId,
    default: "",
    ref: "CoachSchedule",
  },
});

userSchema.methods.matchPassWord = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
