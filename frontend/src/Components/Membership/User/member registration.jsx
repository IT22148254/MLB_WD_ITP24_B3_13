import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Container } from 'reactstrap'
import Swal from "sweetalert2";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const MemberRegistration = () => {

    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [Address, setAddress] = useState('');
    const [Gender, setGender] = useState('male');
    const [NIC, setNIC] = useState('');
    const [phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Dob, setDob] = useState(null);
    
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
        const customer = {Fname, Lname, Address, Gender, NIC, phone, Email, Dob}

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
                setDob(new Date());
            }

        } catch (error) {

            console.error("Error creating User:", error);

        }
    }


    return (
        <section>
            <Container>
                <div className="title">Membership</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Fname">First Name</label>
                        <input
                            type="text"
                            id="Fname"
                            value={Fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="Lname">Last Name</label>
                        <input
                            type="text"
                            id="Lname"
                            value={Lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="Address">Address</label>
                        <textarea
                            id="Address"
                            value={Address}
                            onChange={(e)=>setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="Gender">Gender</label>
                        <select
                            id="Gender"
                            value={Gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="NIC">NIC</label>
                        <input
                            type="text"
                            id="NIC"
                            value={NIC}
                            onChange={handleNicChange}
                        />
                    </div>
                    {nicerror && <span style={{ color: 'red' }}>{nicerror}</span>}
                    <div>
                        <label htmlFor="phone">Contact No</label>
                        <input
                            type="number"
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    {phoneerror && <span style={{ color: 'red' }}>{phoneerror}</span>}
                    <div>
                        <label htmlFor="Email">Email</label>
                        <input
                            type="Email"
                            id="Email"
                            value={Email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    {emailerror && <span style={{ color: 'red' }}>{emailerror}</span>}
                    <div>
                        <label htmlFor="Dob">Date of Birth</label>
                        <DatePicker
                            id="Dob"
                            selected={Dob}
                            onChange={(date)=>setDob(date)}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()} // Set maximum selectable date to current date
                        />
                    </div>
                    {/* {formError && <div style={{ color: 'red' }}>{formError}</div>} */}
                    <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                    <button type="submit">
                        Submit
                    </button>
                </form>

            </Container>
        </section>

    );
}

export default MemberRegistration;