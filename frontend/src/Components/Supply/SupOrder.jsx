import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bg from "../../Images/bg_main.jpg";


const AddOrderForm = () => {
    const [OrderDate, setOrderDate] = useState('');
    const [OrderName, setOrderName] = useState('');
    const [Supplier, setSupplier] = useState('');
    const [error, setError] = useState(null);

    const [orderDateError, setOrderDateError] = useState('');
    const [orderNameError, setOrderNameError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameRegex = /^[a-zA-Z\s]+$/;

        let isValid = true;

        if (!nameRegex.test(OrderName)) {
            setOrderNameError("Order name should not contain numbers");
            isValid = false;
        } else {
            setOrderNameError('');
        }

        if (!isValid) return;

        const order = { OrderDate, OrderName, Supplier };

        try {
            const response = await fetch('http://localhost:8070/supplier/order/add', {
                method: 'POST',
                body: JSON.stringify(order),
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
                    text: "New Order added successfully",
                    icon: "success",
                }).then(() => {
                    console.log('new Order added', json);
                    setOrderDate('');
                    setOrderName('');
                    setSupplier('');
                    setError(null);
                    setOrderDateError('');
                    setOrderNameError('');
                    navigate("/sup/orders/");
                });
            }
        } catch (error) {
            console.error('Error adding Order:', error);
            setError("Failed to add Order");
        }
    };

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };

    const handleOrderNameChange = (e) => {
        const input = e.target.value;
        const nameRegex = /^[a-zA-Z\s]*$/; // Regular expression for alphabetic characters and spaces

        if (!nameRegex.test(input)) {
            setOrderNameError("Order name should not contain special characters");
        } else {
            setOrderNameError('');
            setOrderName(input); // Set the state only if the input is valid
        }
    };

    const handleOrderDateChange = (e) => {
        setOrderDate(e.target.value);
        setOrderDateError('');
    };

    return (
        <div className="flex h-full justify-center items-center" style={bgStyle}>
            <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
                <div className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }}>Add Order</div>
                <form method="POST" className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="OrderName" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Order Name:</label>
                            <input
                                type="text"
                                id="OrderName"
                                name="OrderName"
                                value={OrderName}
                                onChange={handleOrderNameChange}
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            />
                            {orderNameError && <span className="text-red-500">{orderNameError}</span>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="OrderDate" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Order Date:</label>
                        <input
                            type="date"
                            id="OrderDate"
                            name="OrderDate"
                            className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            value={OrderDate}
                            onChange={handleOrderDateChange}
                            required
                        />
                        {orderDateError && <span className="text-red-500">{orderDateError}</span>}
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="Supplier" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Supplier:</label>
                        <input
                            type="text"
                            id="Supplier"
                            name="Supplier"
                            value={Supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                            required
                        />
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

export default AddOrderForm;