const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const morgan = require("morgan");
mongoose.set("strictQuery", false);

const app = express();

require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 8070;

// use middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const con = mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((db) => {
    console.log("Database Connected");
    return db;
  })
  .catch((err) => {
    console.log("Connection Error");
  });

// routes
const employeeRoutes = require("./routs/employee.js");
app.use("/employee", employeeRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
