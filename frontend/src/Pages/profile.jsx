import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import bg from '../Images/package_bg.jpg';
import { useNavigate } from 'react-router-dom';

// const InputField = ({
//     label,
//     type,
//     value,
//     onChange,
//     placeholder,
//     required,
//     error,
//     ...props
// }) => {
//     const inputStyle =
//         'w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500';

//     return (
//         <div className="add-promo-row">
//             <input
//                 type={type}
//                 id={label}
//                 name={label}
//                 value={value}
//                 onChange={onChange}
//                 className={inputStyle}
//                 placeholder={placeholder}
//                 required={required}
//                 {...props}
//             />
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </div>
//     );
// };
const UserProfile = () => {

    const userdata = JSON.parse(localStorage.getItem('userInfo'))
    console.log(userdata.Fname);
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        height: '100%',
    };
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [Address, setAddress] = useState('');
    const [Gender, setGender] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [NIC, setNIC] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Dob, setDob] = useState(null);

    const [passwordError, setPasswordError] = useState('');
    const [nicError, setNicError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [error, setError] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true);
    const navigate = useNavigate();

    const handleNicChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 12 && inputValue !== '') {
            setNicError('NIC should be 12 characters or less');
            return;
        }
        const nicRegex = /^(\d{12}|(\d{11}v?))$/;
        if (!nicRegex.test(inputValue)) {
            setNicError('Please enter a valid NIC');
        } else {
            setNicError('');
        }
        setNIC(inputValue);
    };

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        const contactNoRegex = /^\d{0,10}$/;
        if (!contactNoRegex.test(inputValue)) {
            setPhoneError(
                'Contact number should include up to 10 numbers and contain only digits'
            );
        } else {
            setPhoneError('');
            if (inputValue.length <= 10) {
                setPhone(inputValue);
            }
        }
    };


    const handleEmailChange = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target.value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
        setEmail(e.target.value);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;

        // Regular expressions for password requirements
        const lengthRegex = /.{8,}/; // At least 8 characters long
        const specialCharRegex = /[^A-Za-z0-9]/; // At least one special character
        const capitalLetterRegex = /[A-Z]/; // At least one capital letter

        // Check each requirement and set error messages accordingly
        if (!lengthRegex.test(newPassword)) {
            setPasswordError('Password must be 8 characters or more');
            setPasswordMatch(false); // Password does not match when changing it
        } else if (!specialCharRegex.test(newPassword)) {
            setPasswordError('Password must contain at least one special character');
            setPasswordMatch(false); // Password does not match when changing it
        } else if (!capitalLetterRegex.test(newPassword)) {
            setPasswordError('Password must contain at least one capital letter');
            setPasswordMatch(false); // Password does not match when changing it
        } else {
            setPasswordError('');
            setPasswordMatch(newPassword === confirmPassword); // Check if password matches confirm password
        }

        setPassword(newPassword);
    };


    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        if (newConfirmPassword !== Password) {
            setConfirmPasswordError('Passwords do not match');
            setPasswordMatch(false); // Confirm password does not match when changing it
        } else {
            setConfirmPasswordError('');
            setPasswordMatch(true); // Password matches confirm password
        }
        setConfirmPassword(newConfirmPassword);
    };


    const handleDobChange = (date) => {
        setDob(date);
    };

    const isFormValid = () => {
        // return (
        //     !nicError &&
        //     !phoneError &&
        //     !emailError &&
        //     !passwordError &&
        //     !confirmPasswordError &&
        //     Fname.trim() !== '' &&
        //     Lname.trim() !== '' &&
        //     Address.trim() !== '' &&
        //     Gender.trim() !== '' &&
        //     NIC.trim() !== '' &&
        //     Phone.trim() !== '' &&
        //     Email.trim() !== '' &&
        //     Password.trim() !== '' &&
        //     confirmPassword.trim() !== '' &&
        //     passwordMatch &&
        //     Dob
        // );
    };

    const userId = userdata._id;

    
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get(`/user/get/${userId}`)
    //             const { data } = response; // Destructure the data property
    //             setFname(data.title);
    //             setLname()
    //             setAddress()
    //             setGender()
    //             setPassword()
    //             setNIC()
    //             setPhone()
    //             setEmail()
    //             setDob()
    //         } catch (error) {
    //             setError(error);
    //             console.log('Error fetching email: ', error);
    //         }
    //     };
    //     fetchUser();
    // }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            Fname: Fname,
            Lname: Lname,
            Address: Address,
            Gender: Gender,
            Password: Password,
            NIC: NIC,
            Phone: Phone,
            Email: Email,
            Dob: Dob
        };

        // axios
        //     .put(`http://localhost:8070/user/${id}`, userData)
        //     .then(response => {
        //         Swal.fire({
        //             title: "Success",
        //             text: "Email updated successfully",
        //             icon: "success",
        //         }).then(() => {
        //             console.log('Email updated successfully', response.data);
        //         });
        //         //window.location = "http://localhost:3000/standardpackages";
        //     })
        //     .catch(error => {
        //         Swal.fire({
        //             title: "Error",
        //             text: "Cannot update Email",
        //             icon: "error",
        //         }).then(() => {
        //             console.log('Cannot update Email', error);
        //         });
        //     });
    };

    
    
    console.log(userId)
    //const apiUrl = `/user/get/${userId}`;
    const [profileData, setProfileData] = useState(null)

    useEffect(() => {
        const apiUrl = `/user/get/${userId}`;
        axios.get(apiUrl)
            .then(response => {
                setProfileData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching user profile data:', error);
            });
    }, [userId]);

    // axios.get(apiUrl)
    //     .then(response => {
    //         //console.log('User profile data:', response.data);
    //         setProfileData(response.data)
    //     })
    //     .catch(error => {
    //         console.error('Error fetching user profile data:', error);
    //     });

    return (
        <div className="flex h-full justify-center items-center" style={bgStyle}>
            <div className="bg-black/45 w-1/2 h-5/6 rounded-[50px] py-12 px-14 gap -inset-y-8">
                <p
                    className="text-4xl text-white font-bold align-top mb-8"
                    style={{ WebkitTextStroke: '1px black' }}
                >
                    Profile
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-4">
                        <input
                            label="First Name"
                            type="text"
                            value={userdata.Fname}
                            onChange={(e) => setFname(e.target.value)}
                            placeholder="First Name"
                            required
                            className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                        />
                        <input
                            label="Last Name"
                            type="text"
                            value={userdata.Lname}
                            onChange={(e) => setLname(e.target.value)}
                            placeholder="Last Name"
                            className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            required
                        />
                        <input
                            label="NIC"
                            type="text"
                            value={userdata.NIC}
                            onChange={handleNicChange}
                            placeholder="NIC"
                            required
                        />
                        <div className="add-promo-row">
                            <textarea
                                value={userdata.Address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                                className="w-3/5 bg-white/70 h-18 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            ></textarea>
                        </div>
                        <div className="flex items-center mb-12">
                            <select
                                id="TimeSlot"
                                // className="select-style"
                                className="w-3/5 bg-white/70 h-19 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"

                                value={userdata.Gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled>
                                    Gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <input
                            label="Email"
                            type="email"
                            value={userdata.Email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                            className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            required
                        />
                         {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                        <input
                            label="Password"
                            type="password"
                            value={userdata.Password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            required
                        />
                         {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                        <input
                            label="Contact No"
                            type="number"
                            value={userdata.Phone}
                            onChange={handlePhoneChange}
                            placeholder="Contact No"
                            className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            required
                        />
                         {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
                        <div className="flex items-center mb-12">
                            <DatePicker

                                className=" bg-white/70 w-full h-full rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                selected={userdata.Dob}
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
                        <div className="add-promo-row">
                            <div className="add-promo-btns">
                                <div className='mt-0 mb-5
                '>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-10"
                                        disabled={!isFormValid()}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="reset"
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-10 "
                                    >
                                        Cancel
                                    </button>
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
