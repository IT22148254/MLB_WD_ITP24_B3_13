import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
const UserProfile = () => {
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
                            disabled={!editMode} // Disable input when not in edit mode
                        />
                    </div>
                    <div>
                        <label htmlFor="Lname">Last Name</label>
                        <input
                            type="text"
                            id="Lname"
                            value={Lname}
                            onChange={(e) => setLname(e.target.value)}
                            disabled={!editMode} // Disable input when not in edit mode
                        />
                    </div>
                    <div>
                        <label htmlFor="Address">Address</label>
                        <textarea
                            id="Address"
                            value={Address}
                            onChange={handleAddressChange}
                            disabled={!editMode} // Disable input when not in edit mode
                        />
                    </div>
                    <div>
                        <label htmlFor="Gender">Gender</label>
                        <select
                            id="Gender"
                            value={Gender}
                            onChange={(e) => setGender(e.target.value)}
                            disabled={!editMode} // Disable input when not in edit mode
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
                            disabled={!editMode} // Disable input when not in edit mode
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Contact No</label>
                        <input
                            type="number"
                            id="phone"
                            value={phone}
                            onChange={handleContactChange}
                            disabled={!editMode} // Disable input when not in edit mode
                        />
                    </div>
                    <div>
                        <label htmlFor="Email">Email</label>
                        <input
                            type="Email"
                            id="Email"
                            value={Email}
                            onChange={handleEmailChange}
                            disabled={!editMode} // Disable input when not in edit mode
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
                            disabled={!editMode} // Disable input when not in edit mode
                        />
                    </div>
                    {!editMode ? (
                        <button type='button' className='secondary__btn' onClick={handleEdit}>
                            Edit
                        </button>
                    ) : (
                        <>
                             {formError && <div style={{ color: 'red' }}>{formError}</div>}
                            <button type="button" className='secondary__btn' onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" disabled={!isFormValid()}>
                                Submit
                            </button>
                        </>
                    )}
                </form>
            </Container>
        </section>
    );
};

export default UserProfile;
