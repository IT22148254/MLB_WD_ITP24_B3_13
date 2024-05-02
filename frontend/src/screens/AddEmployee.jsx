import React from "react";
import bg from "../assets/images/bg_main.jpg";
import EmployeeRegisterForm from "../components/EmployeeRegisterForm";

const AddEmployee = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100%",
  };

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between gap-x-20">
          <p className="text-4xl text-white font-bold">Employee Register</p>
        </div>
        <EmployeeRegisterForm />
      </div>
    </div>
  );
};

export default AddEmployee;
