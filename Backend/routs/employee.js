const express = require("express");
const router = express.Router();
const { Employee } = require("../models/employeeModel");

// Get all employees
router.route("/employee").get(async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Get employee by ID
router.route("/employee/find/:id").get(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  try {
    const employee = await Employee.findById(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a new employee
router.route("/employee/create").post(async (req, res) => {
  // const data = req.body;
  try {
    const {
      employeeId,
      fullName,
      nic,
      gender,
      dob,
      contactNo,
      email,
      address,
      role,
    } = req.body;

    const employee = await Employee.create(req.body);
    res.status(200).json({ msg: "Successfully created" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Delete an employee
router.route("/employee/delete").delete(async (req, res) => {
  console.log("req.body", req.body);

  try {
    const employee = await Employee.findOneAndDelete({
      _id: req.body._id,
      employeeId: req.body.employeeId,
    });
    if (employee) {
      console.log("Employee deleted", employee);
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(404).json({ msg: "Employee not found!" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Update an employee
router.route("/employee/update").put(async (req, res) => {
  const {
    _id,
    employeeId,
    fullName,
    nic,
    gender,
    dob,
    contactNo,
    email,
    address,
    role,
  } = req.body;

  try {
    const result = await Employee.findOneAndUpdate(
      { _id: _id },
      {
        employeeId,
        fullName,
        nic,
        gender,
        dob,
        contactNo,
        email,
        address,
        role,
      }
    );
    res.status(200).json({ msg: "Employee updated", employee: result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
