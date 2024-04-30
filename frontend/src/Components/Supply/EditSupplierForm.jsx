import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import bg from "../../Images/bg_main.jpg";
import { useNavigate } from "react-router-dom";


const EditSupplierForm = () => {
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/supplier/get/${id}`);
                const supplier = response.data.supplier;

                setName(supplier.Name);
                setEmail(supplier.Email);
                setPhone(supplier.Phone);
                setAddress(supplier.Address);
            } catch (error) {
                console.error("Error fetching supplier:", error);
            }
        };

        fetchSupplier();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation before submitting
        const nameRegex = /^[a-zA-Z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactNoRegex = /^\d{10}$/;
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

        // If validation passes, submit the form
        axios.put(`http://localhost:8070/supplier/${id}`, {
            Name: Name,
            Email: Email,
            Phone: Phone,
            Address: Address
        })
        .then(response => {
            Swal.fire({
                title: "Success",
                text: "Supplier updated successfully",
                icon: "success",
            }).then(() => {
                console.log('Supplier updated successfully', response.data);
                setError(null);
                navigate("/sup/suppliertable");
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Cannot update Supplier",
                icon: "error",
            }).then(() => {
                console.log('Cannot update Supplier', error);
            });
        });
    };

    return (
        <section className="h-screen flex justify-center items-center" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
            <Container>
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
                        <div className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }}>Edit Supplier</div>
                        <form method="POST" className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-y-4">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="Name" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Supplier Name:</label>
                                    {/* <input
                                        type="text"
                                        id="Name"
                                        name="Name"
                                        value={Name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            const nameRegex = /^[a-zA-Z\s]*$/;
                                            if (!nameRegex.test(e.target.value)) {
                                                setNameError("Supplier name should not contain numbers");
                                            } else {
                                                setNameError('');
                                            }
                                        }}
                                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                    /> */}


                                        <input
                                            type="text"
                                            id="Name"
                                            name="Name"
                                            value={Name}
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                const nameRegex = /^[a-zA-Z\s]*$/; // Regular expression for alphabetic characters and spaces

                                                if (!nameRegex.test(input)) {
                                                    setNameError("Supplier name should not contain special characters");
                                                } else {
                                                    setNameError('');
                                                    setName(input); // Set the state only if the input is valid
                                                }
                                            }}
                                            className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                        />

                                    {nameError && <span className="text-red-500">{nameError}</span>}
                                </div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="Email" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Email:</label>
                                    <input
                                        type="email"
                                        id="Email"
                                        name="Email"
                                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)}
                                       
                                        required
                                        />
                                        {emailError && <span className="text-red-500">{emailError}</span>}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="Phone" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Contact No:</label>
                                        {/* <input
                                            type="text"
                                            id="Phone"
                                            name="Phone"
                                            value={Phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                            required
                                        /> */}

                                        <input
                                            type="text"
                                            id="Phone"
                                            name="Phone"
                                            value={Phone}
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                const phoneRegex = /^\d*$/; // Regular expression for digits only

                                                if (phoneRegex.test(input) && input.length <= 10) {
                                                    setPhone(input); // Set the state only if the input is valid
                                                    setPhoneError('');
                                                } else {
                                                    setPhoneError("Contact number should include 10 numbers and contain only digits");
                                                }
                                            }}
                                            className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                            required
                                        />
                                        
                                        {phoneError && <span className="text-red-500">{phoneError}</span>}
                                    </div>
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
                </Container>
            </section>
        );
    };
    
    export default EditSupplierForm;
    