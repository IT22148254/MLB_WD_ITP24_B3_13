import { useState } from "react";
import { Container } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import bg from "../../../Images/package_bg.jpg";

const AddNewPromoForm = () => {
    
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState(0);
    const [Discription, setDiscription] = useState('');
    const [Duration, setDuration] = useState('');
    const navigate = useNavigate();

    const maxWords = 100;

    const handleCurrency = (value) => {
        var inputvalue = value;

       //inputvalue 

        if (inputvalue < 0) {
            value = 0;
            toast.error('Cannot input below Zero');
        } else {
            setPrice(inputvalue);
        }
    };
    
    

    

    const handlePromoName = (e) => {
        const value = e.target.value;
        const newValue = value.replace(/[^a-zA-Z\s]/g, ''); // Allow only alphabets and spaces
        setName(newValue);
        if (value !== newValue) {
            toast.error('Package name cannot contain numbers');
        }
    };

    const handlePromoDesc = (e) => {
        const textValue = e.target.value;
        const wordCount = textValue.split(/\s+/).filter(Boolean).length; // Counting words
        if (wordCount <= maxWords) {
            setDiscription(textValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const promoPk = { Name, Price, Discription, Duration };
            const response = await axios.post('http://localhost:8070/package/propackage/add', promoPk);
            
            if (response.status === 200) {
                setName('');
                setPrice('');
                setDiscription('');
                setDuration('');
                Swal.fire({
                    title: "Success",
                    text: "New promo added successfully",
                    icon: "success",
                }).then(() => {
                    console.log('New promo added', response.data);
                });
                navigate('/pkg/createdpromos');
            }
        } catch (error) {
            console.error('Error creating promo', error);
        }
    };

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };
    
    return ( 
        <div className="flex h-full justify-center items-center" style={bgStyle}>
            <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 flex flex-col gap-y-8">
                <p className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Add new promo package</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="Name" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl"  style={{ WebkitTextStroke: '1px black' }}>
                                Package Name:
                            </label>
                            <input
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                type="text"
                                id="Name"
                                name="name"
                                value={Name}
                                onChange={handlePromoName}      //onChange={(e) => sethandlePromoName.target.value}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="Details" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>
                                Package Details:
                            </label>
                            <input
                                type="text"
                                id="Details"
                                name="Details"
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                value={Discription}
                                onChange={handlePromoDesc}
                                required  //required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="Price" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>
                                Package Price:
                            </label>
                            <CurrencyInput
                                id="Price"
                                name="Price"
                                className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 
                                text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                placeholder="Enter amount"
                                allowDecimals={true}
                                decimalsLimit={2}
                                prefix="LKR "
                                value={Price}
                                onValueChange={(value) => handleCurrency(value)}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="Date" className="text-white flex items-center pl-5 font-bold text-2xl font-size" style={{ WebkitTextStroke: '1px black' }}>
                                Package Validity:
                            </label>
                            <input
                                type="text"
                                id="Date"
                                name="Date"
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                value={Duration}
                                prefix="Days"
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button type="reset" className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
                                Save
                            </button>                 
                        </div>
                    </div>
                </form> 
            </div>
        </div>     
     );
}
 
export default AddNewPromoForm;
