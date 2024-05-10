import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import bg from "../../Images/bg_main.jpg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const EditOrderForm = () => {
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };

    const[orderID, setorderID] = useState('')
    const [suppliers, setSuppliers] = useState([]);
    const[Supplier, setSupplier] = useState('')
    const[PrName, setPrName] = useState('')
    const[quantity, setQuantity] = useState(0) 
    const [error, setError] = useState(null);
   
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/supplier/order/get/${id}`);
                const supplier = response.data.supplier;

                setPrName(supplier.PrName);
                setQuantity(supplier.quantity);
                setSupplier(supplier.Supplier);
            } catch (error) {
                console.error("Error fetching supplier:", error);
            }
        };

        fetchSupplier();
    }, [id]);

    useEffect(() => {
        const fetchSuppliers = async () => {
          try {
            const { data } = await axios.get('http://localhost:8070/supplier');
            setSuppliers(data.result);
          } catch (error) {
            console.error('Failed to fetch Suppliers', error);
          }
        };
        fetchSuppliers();
      }, []);

      const handleQuantity = (e)=>{
        var inputValue = e.target.value;
    // Ensure the input value is a valid integer
    if (/^-?\d*$/.test(inputValue)) {
        if (inputValue < 0) {
            //ensure the input value is not less than 0
            inputValue = 0;
            toast.error('Cannot input below Zero');
            console.log("Cannot input below Zero")
          }else{
            setQuantity(inputValue);
          }
    }else{
        toast.error('Input only integers');
        console.log('input only integers')
    }}
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation before submitting
        
        // If validation passes, submit the form
        axios.put(`http://localhost:8070/supplier/order/${id}`, {
            PrName: PrName,
            quantity: quantity,
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
        <form method="POST"  className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex justify-between items-center">   {/* check this here */}
                                    <label htmlFor="Name" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl"  style={{ WebkitTextStroke: '1px black' }}>Supplier Name:</label>
                                    <select name="Supplier" id="Name" /*className="dropdown"*/ className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 
                                    text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500" value={Supplier} 
                                    onChange={(e)=>setSupplier(e.target.value)}>
                                         <option value="">Select a supplier </option>
                                            {suppliers.map(sup => (
                                             <option key={sup._id} value={sup._id}>{sup.Name}</option>))}
                                    </select>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">                       
                                    <label for="Details" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Product Name:</label>
                                    <input
                                        type="text"
                                        id="Details"
                                        name="Details"
                                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl 
                                        border-b-2  border-gray-300 focus:outline-none focus:border-green-500"
                                        value={PrName}
                                        onChange={(e)=>setPrName(e.target.value)}
                                        required />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label for="Price" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Quantity:</label>
                                    <input
                                        type="number"
                                        id="Price"
                                        name="Price"
                                        className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold 
                                        placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                        value={quantity}
                                        onChange={handleQuantity}
                                        required />
                                        </div>
                               
                                <div className="add-promo-btns">                  
                                    <div className="flex justify-center mt-9">
                                        <button type='reset' className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mr-20">Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">Submit</button>
                                    </div>
                                    {error && <div>{error}</div>}   
                                </div>
                    </form>
    );
};

export default EditOrderForm;