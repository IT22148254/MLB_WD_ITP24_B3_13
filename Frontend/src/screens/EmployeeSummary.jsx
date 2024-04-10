import React, { useEffect, useState } from "react";
import bg from "../assets/images/bg_main.jpg";
import EmployeeTable from "../components/EmployeeTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeSummary = () => {
  const [employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filterEmployees = (employees, searchText) => {
    return employees.filter(
      (employee) =>
        employee.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.nic.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/employee");
        // console.log(response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  let navigate = useNavigate();

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100%",
  };

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 h-3/4 w-3/4 rounded-[50px] py-10 px-14 flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between gap-x-20">
          <p className="text-4xl text-white font-bold">Employee Summary</p>
          <div className="h-9 bg-white/70 w-1/2 rounded-lg">
            <input
              placeholder="Search (Name, NIC)"
              className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="">
            <button
              className="bg-cyan-400 rounded-lg p-2 font-bold"
              onClick={() => navigate("/add")}
            >
              Add Employee
            </button>
          </div>
        </div>
        <EmployeeTable employees={filterEmployees(employees, searchInput)} />
      </div>
    </div>
  );
};

export default EmployeeSummary;
