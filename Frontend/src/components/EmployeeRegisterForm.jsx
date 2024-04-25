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
  const [role, setRole] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [nicError, setNicError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState("");
  const [contactNoError, setContactNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [roleError, setRoleError] = useState("");

  const [isDobSelected, setIsDobSelected] = useState(false);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const handleNicChange = (e) => {
    const nicRegex = /^(\d{12}|(\d{11}v?))$/i;
    if (!nicRegex.test(e.target.value)) {
      setNicError("Please enter a valid NIC");
    } else {
      setNicError("");
    }
    setNic(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setGenderError("");
  };

  const handleDobChange = (value) => {
    setDob(value);
    setDobError("");
  };

  const handleContactNoChange = (e) => {
    const contactNoRegex = /^\d{10}$/;
    if (!contactNoRegex.test(e.target.value)) {
      setContactNoError(
        "Contact number should include 10 numbers and contain only digits"
      );
    } else {
      setContactNoError("");
    }
    setContactNo(e.target.value);
  };

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAddressError("");
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setRoleError("");
  };

  const handleAddClick = async () => {
    if (!fullName) {
      setFullNameError("Please enter a name");
    }

    if (!nic) {
      setNicError("Please enter a NIC");
    }

    if (!gender) {
      setGenderError("Please select a gender");
    }

    if (!dob) {
      setDobError("Please select a date of birth");
    }

    if (!contactNo) {
      setContactNoError("Please enter a contact number");
    }

    if (!email) {
      setEmailError("Please enter an email");
    }

    if (!address) {
      setAddressError("Please enter an address");
    }

    if (!role) {
      setRole("Please enter role");
    }

    if (
      !fullName ||
      !nic ||
      !gender ||
      !dob ||
      !contactNo ||
      !email ||
      !address ||
      !role
    ) {
      Swal.fire({
        title: "Missing fields",
        text: "Please enter all fields",
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
        role,
      };

      const response = await axios.post(
        "http://localhost:8070/employee/employee/create",
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
        setRole("");
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
              inputStyle +
              (fullNameError &&
                " outline outline-4 outline-red-800 outline-offset-1")
            }
            placeholder="Fullname *"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
        {fullNameError && (
          <p className="text-red-800 font-bold text-lg">{fullNameError}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <input
            className={
              inputStyle +
              (nicError &&
                " outline outline-4 outline-red-800 outline-offset-1")
            }
            placeholder="NIC *"
            value={nic}
            onChange={handleNicChange}
          />
        </div>
        {nicError && (
          <p className="text-red-800 font-bold text-lg">{nicError}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <div className={inputContainerStyle}>
          <select
            className={
              "w-full bg-transparent h-14 rounded-xl text-black font-semibold text-lg pl-4 " +
              (genderError &&
                "outline outline-4 outline-red-800 outline-offset-1")
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
        {genderError && (
          <p className="text-red-800 font-bold text-lg">{genderError}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <div
          className={
            inputContainerStyle +
            " relative select-none " +
            (dobError && "outline outline-4 outline-red-800 outline-offset-1")}
            >
              <p
                onClick={() => setIsDobSelected(!isDobSelected)}
                className={
                  "flex items-center w-full bg-transparent h-14 rounded-xl text-black text-lg pl-5 " +
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
            {dobError && (
              <p className="text-red-800 font-bold text-lg">{dobError}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <div className={inputContainerStyle}>
              <input
                className={
                  inputStyle +
                  (contactNoError &&
                    " outline outline-4 outline-red-800 outline-offset-1")
                }
                placeholder="Contact Number *"
                value={contactNo}
                onChange={handleContactNoChange}
              />
            </div>
            {contactNoError && (
              <p className="text-red-800 font-bold text-lg">{contactNoError}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <div className={inputContainerStyle}>
              <input
                className={
                  inputStyle +
                  (emailError &&
                    " outline outline-4 outline-red-800 outline-offset-1")
                }
                placeholder="Email *"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {emailError && (
              <p className="text-red-800 font-bold text-lg">{emailError}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <div className={inputContainerStyle}>
              <input
                className={
                  inputStyle +
                  (addressError &&
                    " outline outline-4 outline-red-800 outline-offset-1")
                }
                placeholder="Address *"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
            {addressError && (
              <p className="text-red-800 font-bold text-lg">{addressError}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-1">
            <div className={inputContainerStyle}>
              <input
                className={
                  inputStyle +
                  (roleError &&
                    " outline outline-4 outline-red-800 outline-offset-1")
                }
                placeholder="Role *"
                value={role}
                onChange={handleRoleChange}
              />
            </div>
            {roleError && (
              <p className="text-red-800 font-bold text-lg">
                {roleError}
              </p>
            )}
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
                setRole("");
     
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