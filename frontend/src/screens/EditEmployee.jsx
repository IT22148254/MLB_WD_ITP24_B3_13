import React, { useEffect, useState } from "react";
import bg from "../assets/images/bg_main.jpg";
import EmployeeRegisterForm from "../components/EmployeeRegisterForm";
import EmployeeEditForm from "../components/EmployeeEditForm";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const { id } = useParams();

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };

  useEffect(() => {
    console.log("id: ", id);
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/employee/employee/find/${id}`
        );
        const employee = response.data;

        setEmployeeDetails(employee);

        // setFullName(employee.fullName);
        // setNic(employee.nic);
        // setGender(employee.gender);
        // setDob(employee.dob);
        // setContactNo(employee.contactNo);
        // setEmail(employee.email);
        // setAddress(employee.address);
        // setQualifications(employee.qualifications);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 flex flex-col gap-y-8">
        <div className="flex flex-row items-center justify-between gap-x-20">
          <p className="text-4xl text-white font-bold">Employee Update</p>
        </div>
        <EmployeeEditForm id={id} />
      </div>
    </div>
  );
};

export default EditEmployee;
