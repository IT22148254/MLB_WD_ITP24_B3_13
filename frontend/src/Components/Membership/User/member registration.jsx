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
    const [Dob, setDob] = useState(new Date());
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
      };
    
      const handleNICChange = (e) => {
        const nic = e.target.value;
        if (/^\d{11}v?$/.test(nic) || /^\d{12}$/.test(nic)) {
          setNIC(nic);
          setFormError('');
        } else {
          setFormError('NIC format is incorrect');
        }
      };
    
      const handleContactChange = (e) => {
        const phoneNum = e.target.value;
        if (/^\d{10}$/.test(phoneNum)) {
          setPhone(phoneNum);
          setFormError('');
        } else {
          setFormError('Phone number should be 10 digits');
        }
      };

      const handleEmailChange = (e) => {
        const EmailValue = e.target.value;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailValue)) {
          setEmail(EmailValue);
          setFormError('');
        } else {
          setFormError('Invalid Email format');
        }
      };

      const isFormValid = () => {
        return (
          Fname.trim() !== '' &&
          Lname.trim() !== '' &&
          Address.trim() !== '' &&
          Gender.trim() !== '' &&
          NIC.trim() !== '' &&
          phone.trim() !== '' &&
          Email.trim() !== '' &&
          Dob !== ''
        );
      };

      const handleDobChange = (date) => {
        setDob(date);
      };


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

            const response = await axios.post("http://localhost:8000/register", customer)

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
                            onChange={handleAddressChange}
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
                            onChange={handleNICChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Contact No</label>
                        <input
                            type="number"
                            id="phone"
                            value={phone}
                            onChange={handleContactChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="Email">Email</label>
                        <input
                            type="Email"
                            id="Email"
                            value={Email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="Dob">Date of Birth</label>
                        <DatePicker
                            id="Dob"
                            selected={Dob}
                            onChange={handleDobChange}
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()} // Set maximum selectable date to current date
                        />
                    </div>
                    {formError && <div style={{ color: 'red' }}>{formError}</div>}
                    <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                    <button type="submit" disabled={!isFormValid()}>
                        Submit
                    </button>
                </form>

            </Container>
        </section>

    );
}

export default MemberRegistration;