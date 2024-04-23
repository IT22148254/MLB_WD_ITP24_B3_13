const express = require("express");
const employeeRoute = express.Router();

const EmployeeController = require("../controllers/employeeController");

employeeRoute.get("/employee", EmployeeController.getAllEmployees);
employeeRoute.get("/employee/find/:id", EmployeeController.getEmployeeById);
employeeRoute.post("/employee/create", EmployeeController.createEmployee);
employeeRoute.delete("/employee/delete", EmployeeController.deleteEmployee);
employeeRoute.put("/employee/update", EmployeeController.updateEmployee);

module.exports = employeeRoute;
