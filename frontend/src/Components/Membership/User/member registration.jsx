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
  const [phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Dob, setDob] = useState(null);
  const [AccLevel, setAccLevel] = useState('customer')

  const [passwordError, setPasswordError] = useState('');
  const [nicerror, setNicError] = useState('')
  const [phoneerror, setPhoneError] = useState('')
  const [emailerror, setEmailError] = useState('')
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

    // Check if the input value is empty
    if (inputValue === '') {
      setPhoneError('');
    } else {
      // Regular expression to validate contact number format
      const contactNoRegex = /^\d{10}$/;

      // Test the input against the regular expression
      if (!contactNoRegex.test(inputValue)) {
        setPhoneError(
          "Contact number should include 10 numbers and contain only digits"
        );
      } else {
        setPhoneError("");
      }
    }

    // Update the phone state
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
    setPassword(newPassword);

    if (newPassword.length > 8) {
      setPasswordError('Password must be 8 characters or less');
    } else {
      setPasswordError('');
    }
  };






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
    const customer = { Fname, Lname, Address, Gender, NIC, phone, Email, Dob, AccLevel }

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

      const response = await axios.post("http://localhost:8070/user/add", customer)

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
                id="Name"
                name="First Name"
                value={Fname}
                onChange={(e)=>setFname(e.target.value)}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Title"
                required />
            </div>
            <div className="add-promo-row">
              <input
                type="text"
                id="Last Name"
                name="password"
                value={Lname}
                onChange={(e)=>setLname(e.target.value)}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Subject"
                required />
            </div>
            
            <div className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500">
              <textarea value={Address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" className="w-full max-w-full min-w-full"></textarea>
            </div>
            <div className="flex items-center mb-12">
                        <select
                            id="TimeSlot"
                            className="w-3/4 px-3 py-2 border-2 border-blue-400 rounded-xl"
                            value={Gender}
                            placeholder="Gender"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="8.30-10.30">Male</option>
                            <option value="10.30-12.30">Female</option>
                        </select>
              </div>
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
            
            <div className="add-promo-row">
              <input
                type="email"
                id="subject"
                name="password"
                value={Email}
                onChange={handleEmailChange}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Subject"
                required />
            </div>
            <div className="add-promo-row">
              <input
                type="email"
                id="subject"
                name="password"
                value={phone}
                onChange={handlePhoneChange}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Subject"
                required />
            </div>
            <div className="flex items-center mb-12">     
                        <input
                            type="date"
                            dateFormat="dd/mm/yyyy"
                            id="Date"
                            name="Details"
                            value={Date}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-3/4 px-3 py-2 border-2 border-blue-400 rounded-xl"
                            placeholder="Dob"
                            required
                        />
                    </div>


            <div class="add-promo-row">
              <div className="add-promo-btns">
                <div>
                  {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                  <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-10">Save</button>
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