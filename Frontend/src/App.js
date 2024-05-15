import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeSummary from "./screens/EmployeeSummary";
import AddEmployee from "./screens/AddEmployee";
import LeaveSummary from "./screens/LeaveApproval.jsx";
import EditEmployee from "./screens/EditEmployee";
import SalaryCalculator from "./screens/SalaryCalculator.jsx";
import ApplyLeave from "./components/ApplyLeave.jsx"
import ContactUs from "./components/Eeeee.jsx"


const App = () => {
  return (
    <div className="h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeSummary />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
          <Route path="/calculator" element={<SalaryCalculator />} />
          <Route path="/addleave" element={<ApplyLeave />} />
          <Route path="/showleave" element={<LeaveSummary />} />
          <Route path="/e" element={<ContactUs/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
