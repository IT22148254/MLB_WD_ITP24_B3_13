const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  Name: {
    type: String,
    required: true,
  },

  Price: {
    type: Number,
    required: true,
  },

  Description: {
    type: String,
    required: false,
  },

  Stock: {
    type: Number,
    required: true,
  },

  Sold: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
