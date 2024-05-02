import React from "react";
import bg from "../assets/images/bg_main.jpg";
import EmployeeRegisterForm from "../components/EmployeeRegisterForm";
import Calculator from "../components/Calculator";

const SalaryCalculator = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100%",
  };

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-2/3 rounded-[50px] py-8 px-14 flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between gap-x-20">
          <p className="text-4xl text-white font-bold">Calculate Salary</p>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default SalaryCalculator;
