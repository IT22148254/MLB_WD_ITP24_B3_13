import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import bg from "../../Images/bg_main.jpg";
import { useNavigate } from "react-router-dom";


const EditOrderForm = () => {
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };

    const [OrderName, setOrderName] = useState('');
    const [OrderDate, setOrderDate] = useState('');
    const [Supplier, setSupplier] = useState('');
    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/supplier/order/get/${id}`);
                const supplier = response.data.supplier;

                setOrderName(supplier.OrderName);
                setOrderDate(supplier.OrderDate);
                setSupplier(supplier.Supplier);
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

        // Validation logic here...

        if (!isValid) return;

        // If validation passes, submit the form
        axios.put(`http://localhost:8070/supplier/order/${id}`, {
            OrderName: OrderName,
            OrderDate: OrderDate,
            Supplier: Supplier,
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
                                    <label htmlFor="OrderName" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Order Name:</label>
                                    <input
                                        type="text"
                                        id="OrderName"
                                        name="OrderName"
                                        value={OrderName}
                                        onChange={(e) => setOrderName(e.target.value)}
                                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="OrderDate" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Order Date:</label>
                                    <input
                                        type="text"
                                        id="OrderDate"
                                        name="OrderDate"
                                        value={OrderDate}
                                        onChange={(e) => setOrderDate(e.target.value)}
                                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="Supplier" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Supplier:</label>
                                    <input
                                        type="text"
                                        id="Supplier"
                                        name="Supplier"
                                        value={Supplier}
                                        onChange={(e) => setSupplier(e.target.value)}
                                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                        required
                                    />
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

export default EditOrderForm;
