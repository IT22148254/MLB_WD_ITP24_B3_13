import React from "react";
import bg from "../assets/images/bg_main.jpg";
import EmployeeTable from "../components/EmployeeTable";
import { useNavigate } from "react-router-dom";

const EmployeeSummary = () => {
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
          {/* <div className="h-8 bg-red-300 w-1/2 rounded-lg">
            <input className="bg-transparent w-full h-full border-none active:border-none focus:border-0" />
          </div> */}
          <div className="">
            <button
              className="bg-cyan-400 rounded-lg p-2 font-bold"
              onClick={() => navigate("/add")}
            >
              Add Employee
            </button>
          </div>
        </div>
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeeSummary;
