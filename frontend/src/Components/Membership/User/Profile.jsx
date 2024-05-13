import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
const UserProfile = () => {
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    
      }
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [Address, setAddress] = useState('');
    const [Gender, setGender] = useState('male');
    const [NIC, setNIC] = useState('');
    const [phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Dob, setDob] = useState(new Date());
    const [formError, setFormError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const { id } = useParams();

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

    
    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        // Reset form fields to their initial values
        // Example: You might fetch the user's data again from the server
        setEditMode(false);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/email/get/${id}`);
                const { data } = response; // Destructure the data property
                setTitle(data.title);
                setSubject(data.subject);
                setContent(data.content);
                console.log(response);
            } catch (error) {
                setError(error);
                console.log('Error fetching email: ', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailData = {
            title: title,
            subject: subject,
            content: content,
        };

        axios
            .put(`http://localhost:8070/email/${id}`, emailData)
            .then(response => {
                Swal.fire({
                    title: "Success",
                    text: "Email updated successfully",
                    icon: "success",
                }).then(() => {
                    console.log('Email updated successfully', response.data);
                });
                //window.location = "http://localhost:3000/standardpackages";
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: "Cannot update Email",
                    icon: "error",
                }).then(() => {
                    console.log('Cannot update Email', error);
                });
            });
    };

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
                value={confirmPassword}
                onChange={handlePasswordChange}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                          pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                placeholder="Confirm Password"
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
                placeholder="Email"
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
                placeholder="Contact No"
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
};

export default UserProfile;
