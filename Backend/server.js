const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();



const PORT = process.env.PORT || 8070;

// use middleware
app.use(cors());
app.use(bodyParser.json());;

const URL = process.env.MONGO_DB_URL;

mongoose.connect(URL, {});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection successful");
});
// routes


const employeeRoutes = require("./routs/employee.js");
app.use("/employee", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port : ${PORT}`);
});
