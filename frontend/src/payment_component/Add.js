import React, { useState } from "react";
import { NavLink,useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Add() {
  const [inputdata, setInputdata] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const location = useLocation();

  const setstud = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };

  const validateContact = (value) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(value);
  };

  const handleContactBlur = (e) => {
    const value = e.target.value;
    if (!validateContact(value)) {
      toast.error("Please enter a valid 10-digit contact number", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, contact } = inputdata;
    if (!name || !/^[a-zA-Z.]+$/.test(name)) {
      toast.error("Please enter a valid name (letters and periods only)", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!validateContact(contact)) {
      toast.error("Please enter a valid 10-digit contact number", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const res = await fetch("http://localhost:8070/payment/addstud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        contact,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data) {
      console.log("error ");
      alert("error");
    } else {
      setInputdata(data);
      toast.success("Please wait  !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.href = "http://localhost:3001/pay";
      }, 3000);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/../image/homemale.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <center>
        <h4 style={{ color: "white" }}>Payment</h4>

        <div className="underline1"></div>
      </center>

      <form
        className="mt-5 shadow p-5"
        style={{
          backgroundColor: "#0000ff80",
          maxWidth: "50%",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Name"
            onChange={setstud}
            name="name"
            value={inputdata.name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Email"
            onChange={setstud}
            name="email"
            value={inputdata.email}
          />
        </div>

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Contact Number
        </label>
        <input
          type="number"
          className={`form-control ${
            inputdata.contact.length === 10 ? "is-valid" : "is-invalid"
          }`}
          id="exampleFormControlInput1"
          placeholder="Enter Mobile Number"
          onChange={setstud}
          onKeyPress={(event) => {
            if (event.target.value.length >= 10) {
              event.preventDefault();
            }
          }}
          name="contact"
          value={inputdata.contact}
          maxLength={10}
          minLength={10}
          pattern="\d{10}"
          required
        />

        <div className="d-flex">
          <button className="btn btn-primary" onClick={addinpdata}>
            Next
          </button>
          <ToastContainer />
          <NavLink className="btn btn-primary ms-auto" to="/">
            Cancel
          </NavLink>
        </div>
      </form>

      {/* Bottom photo */}
      <div className="text-center mt-5">
        <img
          src="../image/7011023.jpg"
          alt="Bottom Photo"
          style={{ maxWidth: "100%", height: "250px" }}
        />
      </div>
    </div>
  );
}
