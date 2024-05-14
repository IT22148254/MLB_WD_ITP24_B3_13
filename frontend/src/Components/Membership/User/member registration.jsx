import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Container } from 'reactstrap'
import Swal from "sweetalert2";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import bg from "../../../Images/package_bg.jpg";

const MemberRegistration = () => {

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",

  }

  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Address, setAddress] = useState('');
  const [Gender, setGender] = useState('male');
  const [Password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [NIC, setNIC] = useState('');
  const [Phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Dob, setDob] = useState(null);
  const [AccLevel, setAccLevel] = useState('customer')

  const [passworderror, setPasswordError] = useState('');
  const [nicerror, setNicError] = useState('')
  const [phoneerror, setPhoneError] = useState('')
  const [emailerror, setEmailError] = useState('')
  const [confirmPassworderror, setConfirmPasswordError] = useState('')
  const navigate = useNavigate();

  // const handleAddressChange = (e) => {
  //     setAddress(e.target.value);
  //   };

  const handleNicChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input length exceeds 12 characters, or if it's empty
    if (inputValue.length > 12 && inputValue !== '') {
      setNicError("NIC should be 12 characters or less");
      return; // Stop further processing
    }

    // Regular expression to validate NIC format
    const nicRegex = /^(\d{12}|(\d{11}v?))$/;

    // Test the input against the regular expression
    if (!nicRegex.test(inputValue)) {
      setNicError("Please enter a valid NIC");
    } else {
      setNicError("");
    }

    // Update the NIC state
    setNIC(inputValue);
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
  
    // Regular expression to validate contact number format
    const contactNoRegex = /^\d{0,10}$/; // Allow up to 10 digits
  
    // Test the input against the regular expression
    if (!contactNoRegex.test(inputValue)) {
      setPhoneError(
        "Contact number should include up to 10 numbers and contain only digits"
      );
    } else {
      setPhoneError("");
    }
  
    setPhone(inputValue);
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

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;

    if (newPassword.length > 8) {
      setPasswordError('Password must be 8 characters or less');
    } else {
      setPassword(newPassword);
      setPasswordError('');
    }
  };


  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword)

    if (Password !== confirmPassword) {
      setConfirmPasswordError('password does not match')
    }
    else {
      setConfirmPasswordError('')
    }
  }

  const handleDobChange =(date)=>{
    setDob(date)
  }






  //   const handleContactChange = (e) => {
  //     const phoneNum = e.target.value;
  //     if (/^\d{10}$/.test(phoneNum)) {
  //       setFormError('');
  //     } else {
  //       setFormError('Phone number should be 10 digits');
  //     }
  //     setPhone(phoneNum);
  //   };

  //   const handleEmailChange = (e) => {
  //     const EmailValue = e.target.value;
  //     if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailValue)) {
  //       setFormError('');
  //     } else {
  //       setFormError('Invalid Email format');
  //     }
  //     setEmail(EmailValue);
  //   };

  //   const isFormValid = () => {
  //     return (
  //       Fname.trim() !== '' &&
  //       Lname.trim() !== '' &&
  //       Address.trim() !== '' &&
  //       Gender.trim() !== '' &&
  //       NIC.trim() !== '' &&
  //       phone.trim() !== '' &&
  //       Email.trim() !== '' &&
  //       Dob !== ''
  //     );
  //   };

  //   const handleDobChange = (date) => {
  //     setDob(date);
  //   };


  const handleSubmit = async (e) => {
    e.preventDefault()


    // Passwords match, proceed with form submission
    const user = { Fname, Lname, Address, Gender, NIC, Phone, Email, Password, Dob, AccLevel }

    // const response = await fetch('http://localhost:8000/register', {
    //   method: 'POST',
    //   body: JSON.stringify(customer),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }})

    // const json = await response.json()

    //             if (!response.ok) {
    //                 setError(json.error)
    //             }

    //             if(response.ok){

    //                 setName('')
    //                 setEmail('')
    //                 setPassword('')
    //                 setConfirmPassword('')
    //                 setIsChecked(false)
    //                 setError(null)y


    //                 Swal.fire({
    //                     title: "Success",
    //                     text: "registered successfully",
    //                     icon: "success",
    //                   }).then(()=>{
    //                     console.log('new User added', json)
    //                   })

    //                 {/*navigate('/promoPackages')*/}
    //         }

    try {

      const response = await axios.post("http://localhost:8070/user/add", user)

      if (response.ok) {

        Swal.fire({
          title: "Success",
          text: "registered successfully",
          icon: "success",
        }).then(() => {
          console.log('new User added'
          )
        })

        //set all fields empty
        setFname('');
        setLname('');
        setAddress('');
        setGender('male');
        setNIC('');
        setPhone('');
        setEmail('');
        setDob(null);
      }

    } catch (error) {

      console.error("Error creating User:", error);

    }
  }


  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
        <p className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Registration</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                id="Fname"
                name="First Name"
                value={Fname}
                onChange={(e) => setFname(e.target.value)}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Fname"
                required />
            </div>
            <div className="add-promo-row">
              <input
                type="text"
                id="Last Name"
                value={Lname}
                onChange={(e) => setLname(e.target.value)}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Lname"
                required />
            </div>
            <div className="add-promo-row">
              <input
                type="text"
                id="Last Name"
                value={NIC}
                onChange={handleNicChange}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="NIC"
                required />
              {nicerror && <div style={{ color: 'red' }}>{nicerror}</div>}
            </div>

            <div className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500">
              <textarea value={Address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full max-w-full min-w-full"></textarea>
            </div>
            <div className="flex items-center mb-12">
              <select
                id="TimeSlot"
                className="w-3/4 px-3 py-2 border-2 border-blue-400 rounded-xl"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="add-promo-row">
              <input
                type="email"
                id="subject"
                name="password"
                value={Email}
                onChange={handleEmailChange}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Email"
                required />
            </div>
            {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
            <div className="add-promo-row">
              <input
                type="text"
                id="subject"
                name="password"
                value={Password}
                onChange={handlePasswordChange}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Password"
                required />
            </div>
            {passworderror && <div style={{ color: 'orange' }}>{passworderror}</div>}
            <div className="add-promo-row">
              <input
                type="text"
                id="subject"
                name="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Confirm Password"
                required />
            </div>
            {confirmPassworderror && <div style={{ color: 'red' }}>{confirmPassworderror}</div>}
            <div className="add-promo-row">
              <input
                type="number"
                id="subject"
                name="password"
                value={Phone}
                onChange={handlePhoneChange}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Contact No"
                required />
            </div>
            {phoneerror && <div style={{ color: 'orange' }}>{phoneerror}</div>}
            <div className="flex items-center mb-12">
              <DatePicker
                selected={Dob}
                onChange={handleDobChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="DOB"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()} // Optional: Restrict selection to dates before today
                popperPlacement="bottom"
              />
            </div>


            <div class="add-promo-row">
              <div className="add-promo-btns">
                <div>
                  {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                  <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-10">Register</button>
                  <button type='reset' className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-10 ">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}

export default MemberRegistration;