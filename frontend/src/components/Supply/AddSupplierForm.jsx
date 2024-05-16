import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bg from "../../Images/bg_main.jpg";

const AddSupplierForm = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [error, setError] = useState(null);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactNoRegex = /^\d{10}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;

        let isValid = true;

        if (!nameRegex.test(Name)) {
            setNameError("Supplier name should not contain numbers");
            isValid = false;
        } else {
            setNameError('');
        }

        if (!emailRegex.test(Email)) {
            setEmailError("Please enter a valid email address");
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!contactNoRegex.test(Phone)) {
            setPhoneError("Contact number should include 10 numbers and contain only digits");
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (!isValid) return;

        const supplier = { Name, Email, Phone, Address };

        try {
            const response = await fetch('http://localhost:8070/supplier/add', {
                method: 'POST',
                body: JSON.stringify(supplier),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            }

            if (response.ok) {
                Swal.fire({
                    title: "Success",
                    text: "New Supplier added successfully",
                    icon: "success",
                }).then(() => {
                    console.log('new Supplier added', json);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setAddress('');
                    setError(null);
                    setNameError('');
                    setEmailError('');
                    setPhoneError('');
                    navigate("/sup/suppliertable");
                });
            }
        } catch (error) {
            console.error('Error adding Supplier:', error);
            setError("Failed to add Supplier");
        }
    };

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };

    
    const handleNameChange = (e) => {
        const input = e.target.value;
        const nameRegex = /^[a-zA-Z\s]*$/; // Regular expression for alphabetic characters and spaces
    
        if (!nameRegex.test(input)) {
            setNameError("Supplier name should not contain special characters");
        } else {
            setNameError('');
            setName(input); // Set the state only if the input is valid
        }
    };
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input) && input.length <= 10) {
            setPhone(e.target.value);
            setPhoneError('');
        } else {
            setPhoneError("Contact number should include 10 numbers and contain only digits");
        }
    };

    

    return (
        <div className="flex h-full justify-center items-center" style={bgStyle}>
            <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
                <div className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }}>Add Supplier</div>
                <form method="POST" className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="Name" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Supplier Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                value={Name}
                                onChange={handleNameChange}
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            />
                           
                        </div>
                    </div>
                    {nameError && <span className="text-red-500 ml-11">{nameError}</span>}
                  <br></br>
                    <div className="flex justify-between items-center">
                        <label htmlFor="Email" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Email:</label>
                        <input
                            type="email"
                            id="Email"
                            name="Email"
                            className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            value={Email}
                            onChange={handleEmailChange}
                            // onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                       
                    </div>
                    {emailError && <span className="text-red-500 ml-11">{emailError}</span>}
                    <br></br>
                    <div className="flex justify-between items-center">
                        <label htmlFor="Phone" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Contact No:</label>
                        <input
                            type="text"
                            id="Phone"
                            name="Phone"
                            value={Phone}
                            onChange={handlePhoneChange}
                            className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            required
                        />
                        
                    </div>
                    {phoneError && <span className="text-red-500 ml-11">{phoneError}</span>}
                    <br></br>
                    <div className="flex justify-between items-center">
                        <label htmlFor="Address" className="text-white flex items-center pl-5 font-bold text-2xl font-size" style={{ WebkitTextStroke: '1px black' }}>Address:</label>
                        <textarea
                            id="Address"
                            name="Address"
                            className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="add-promo-btns">
                        <div className="flex justify-center mt-9">
                            <button type='reset' className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mr-20">Cancel</button>
                            <button type='submit' className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">Submit</button>
                        </div>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default AddSupplierForm;
