const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

// Configure email transport options
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email route
app.post('/api/send-email', (req, res) => {
  const { to, subject, message } = req.body;

  // Configure email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

const PORT = process.env.PORT || 8070;

// use middleware
app.use(cors());
app.use(bodyParser.json());

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
