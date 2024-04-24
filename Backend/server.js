const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL_STORE;

mongoose.connect(URL, {});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection successful");
});

const productRouter = require("./routs/products.js");
app.use("/product", productRouter);

const userRouter = require("./routs/users.js");
app.use("/user", userRouter);

const feedBackRouter = require("./routs/feedbacks.js");
app.use("/feedback", feedBackRouter);

const packageRouter = require("./routs/packages.js");
app.use("/package", packageRouter);

const scheduleRouter = require("./routs/schedules.js");
app.use("/schedule", scheduleRouter);

const supplierRouter = require("./routs/suppliers.js");
app.use("/supplier", supplierRouter);

const emailrouter = require("./routs/email.js")
app.use("/email", emailrouter)


app.listen(PORT, () => {
  console.log(`Server is up and running on port : ${PORT}`);
});
