import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./calendar.css";

const EmployeeRegisterForm = () => {
  let navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [qualifications, setQualifications] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [nicError, setNicError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [qualificationsError, setQualificationsError] = useState("");

  const [isDobSelected, setIsDobSelected] = useState(false);

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

      const response = await axios.post(
        "http://localhost:8000/employee/create",
        employeeData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Successfully created",
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
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const inputContainerStyle = "bg-white/70 rounded-xl";
  const inputStyle =
    "w-full bg-transparent h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl";

  return (
    <div
      className="flex flex-col gap-y-4 overflow-auto max-h-[700px] p-5"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <input
            className={
              inputStyle + " outline outline-4 outline-red-800 outline-offset-1"
            }
            placeholder="Fullname *"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
        <p className="text-red-800 font-bold text-lg">Please enter a name</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <input
            className={
              inputStyle + " outline outline-4 outline-red-800 outline-offset-1"
            }
            placeholder="NIC *"
            value={nic}
            onChange={handleNicChange}
          />
        </div>
        <p className="text-red-800 font-bold text-lg">Please enter a NIC</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <select
            className={
              "w-full bg-transparent h-14 rounded-xl text-black font-semibold text-lg pl-4 " +
              "outline outline-4 outline-red-800 outline-offset-1"
            }
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="" disabled>
              Select Gender *
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <p className="text-red-800 font-bold text-lg">Please Select a Gender</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div
          className={
            inputContainerStyle +
            " relative select-none outline outline-4 outline-red-800 outline-offset-1"
          }
        >
          <p
            onClick={() => setIsDobSelected(!isDobSelected)}
            className={
              "flex items-center w-full bg-transparent h-14 rounded-xl text-black text-xl pl-5 " +
              (dob ? "font-normal" : "font-semibold ")
            }
          >
            {dob === null
              ? "Date of Birth *"
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
        <p className="text-red-800 font-bold text-lg">
          Please Select Date of Birth
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <input
            className={
              inputStyle + " outline outline-4 outline-red-800 outline-offset-1"
            }
            placeholder="Contact Number *"
            value={contactNo}
            onChange={handleContactNoChange}
          />
        </div>
        <p className="text-red-800 font-bold text-lg">
          Please enter a contact number
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <input
            className={
              inputStyle + " outline outline-4 outline-red-800 outline-offset-1"
            }
            placeholder="Email *"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <p className="text-red-800 font-bold text-lg">Please enter an email</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <input
            className={
              inputStyle + " outline outline-4 outline-red-800 outline-offset-1"
            }
            placeholder="Address *"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <p className="text-red-800 font-bold text-lg">
          Please enter an address
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <input
            className={
              inputStyle + " outline outline-4 outline-red-800 outline-offset-1"
            }
            placeholder="Qualifications *"
            value={qualifications}
            onChange={handleQualificationsChange}
          />
        </div>
        <p className="text-red-800 font-bold text-lg">
          Please enter qualifications
        </p>
      </div>
      <div className="flex justify-between mt-5">
        <button
          className="bg-cyan-400 py-3 px-8 rounded-lg text-lg font-bold"
          onClick={handleAddClick}
        >
          Add
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

export default EmployeeRegisterForm;
