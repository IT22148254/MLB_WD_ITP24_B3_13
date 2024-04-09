import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeSummary from "./screens/EmployeeSummary";
import AddEmployee from "./screens/AddEmployee";
import EditEmployee from "./screens/EditEmployee";

const App = () => {
  return (
    <div className="h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<EmployeeSummary />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
