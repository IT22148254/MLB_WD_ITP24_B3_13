import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./calendar.css";

const EmployeeEditForm = ({ id }) => {
  let navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [qualifications, setQualifications] = useState("");

  const [isDobSelected, setIsDobSelected] = useState(false);

  useEffect(() => {
    console.log("id: ", id);
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/employee/employee/find/${id}`
        );
        const employee = response.data;

        console.log("DOB: ", employee.dob);

        setFullName(employee.fullName);
        setNic(employee.nic);
        setGender(employee.gender);
        setDob(new Date(employee.dob));
        setContactNo(employee.contactNo);
        setEmail(employee.email);
        setAddress(employee.address);
        setQualifications(employee.qualifications);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, []);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleNicChange = (e) => {
    setNic(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDobChange = (value) => {
    setDob(value);
  };

  const handleContactNoChange = (e) => {
    setContactNo(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleQualificationsChange = (e) => {
    setQualifications(e.target.value);
  };

  const handleAddClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactNoRegex = /^\d{10}$/;

    if (
      !fullName ||
      !nic ||
      !gender ||
      !dob ||
      !contactNo ||
      !email ||
      !address ||
      !qualifications
    ) {
      Swal.fire({
        title: "Missing fields",
        text: "Please enter all fields",
        icon: "error",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Invalid email",
        text: "Please enter a valid email address",
        icon: "error",
      });
      return;
    }

    if (!contactNoRegex.test(contactNo)) {
      Swal.fire({
        title: "Invalid contact number",
        text: "Contact number should include 10 numbers and contain only digits",
        icon: "error",
      });
      return;
    }

    try {
      const employeeData = {
        _id: id,
        employeeId: "EMP000",
        fullName,
        nic,
        gender,
        dob,
        contactNo,
        email,
        address,
        qualifications,
      };

      const response = await axios.put(
        "http://localhost:8070/employee/employee/update",
        employeeData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Successfully updated",
          icon: "success",
        });
        // Clear all the text fields
        setFullName("");
        setNic("");
        setGender("");
        setDob("");
        setContactNo("");
        setEmail("");
        setAddress("");
        setQualifications("");
      }

      // Navigate away
      navigate("/");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  // useEffect(() => {
  //   console.log("id: ", id);
  //   const fetchEmployee = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8070/employee/employee/employee/${id}`
  //       );
  //       const employee = response.data;

  //       setFullName(employee.fullName);
  //       setNic(employee.nic);
  //       setGender(employee.gender);
  //       setDob(employee.dob);
  //       setContactNo(employee.contactNo);
  //       setEmail(employee.email);
  //       setAddress(employee.address);
  //       setQualifications(employee.qualifications);
  //     } catch (error) {
  //       console.error("Error fetching employee:", error);
  //     }
  //   };

  //   fetchEmployee();
  // }, [id]);

  const inputContainerStyle = "bg-white/70 h-14 rounded-xl";
  const inputStyle =
    "w-full bg-transparent h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl";

  return (
    <div className="flex flex-col gap-y-4">
      <div className={inputContainerStyle}>
        <input
          className={inputStyle}
          placeholder="Fullname"
          value={fullName}
          onChange={handleFullNameChange}
        />
      </div>
      <div className={inputContainerStyle}>
        <input
          className={inputStyle}
          placeholder="NIC"
          value={nic}
          onChange={handleNicChange}
        />
      </div>
      <div className={inputContainerStyle}>
        <select
          className="w-full bg-transparent h-14 rounded-xl text-black font-semibold text-lg pl-4"
          value={gender}
          onChange={handleGenderChange}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className={inputContainerStyle + " relative select-none"}>
        <p
          onClick={() => setIsDobSelected(!isDobSelected)}
          className={
            "flex items-center w-full bg-transparent h-14 rounded-xl text-black pl-5 " +
            (dob ? "font-normal text-lg" : "font-semibold text-lg")
          }
        >
          {dob === null
            ? "Date of Birth"
            : `${dob.getFullYear()} - ${
                dob.getMonth() < 10
                  ? "0" + dob.getMonth().toString()
                  : dob.getMonth()
              } - ${
                dob.getDate() < 10
                  ? "0" + dob.getDate().toString()
                  : dob.getDate()
              }`}
        </p>
        <div
          className={
            "absolute z-10 top-16 right-0 transition-opacity duration-150 ease-in-out  " +
            (isDobSelected ? "opacity-100" : "opacity-0")
          }
        >
          <Calendar onChange={handleDobChange} value={dob} />
        </div>
      </div>
      <div className={inputContainerStyle}>
        <input
          className={inputStyle}
          placeholder="Contact Number"
          value={contactNo}
          onChange={handleContactNoChange}
        />
      </div>
      <div className={inputContainerStyle}>
        <input
          className={inputStyle}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className={inputContainerStyle}>
        <input
          className={inputStyle}
          placeholder="Address"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <div className={inputContainerStyle}>
        <input
          className={inputStyle}
          placeholder="Qualifications"
          value={qualifications}
          onChange={handleQualificationsChange}
        />
      </div>
      <div className="flex justify-between mt-5">
        <button
          className="bg-cyan-400 py-3 px-8 rounded-lg text-lg font-bold"
          onClick={handleAddClick}
        >
          Update
        </button>
        <button
          className="bg-red-500 py-3 px-8 rounded-lg text-lg font-bold"
          onClick={() => {
            // Clear all the text fields
            setFullName("");
            setNic("");
            setGender("");
            setDob("");
            setContactNo("");
            setEmail("");
            setAddress("");
            setQualifications("");

            // Navigate away
            navigate("/");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmployeeEditForm;
