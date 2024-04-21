const mongoose = require("mongoose");
const schema = mongoose.Schema;

const supplierSchema = new schema({
  Name: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  
});

const orderSchema = new schema({
  Supplier: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "Supplier",
  },
  OrderName: {
    type: String,
    required: true,
  },
  OrderDate: {
    type: String,
    required: true,
  },
});

const supReportSchema = new schema({
  Category: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);
const Order = mongoose.model("Order", orderSchema);
const Report = mongoose.model("Report", supReportSchema);

module.exports = { Supplier, Order, Report };
