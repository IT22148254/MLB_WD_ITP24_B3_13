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

const promoPackageSchema = new schema({
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




const showPackageSchema = new schema({
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
const ShowPackage=mongoose.model("ShowPackage",showPackageSchema);
const Package = mongoose.model("Package", packageSchema);
const PromoPackage = mongoose.model("PromoPackage", promoPackageSchema);
module.exports = { Package, PromoPackage, ShowPackage };






