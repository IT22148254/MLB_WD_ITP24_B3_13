




import { useState, useEffect } from "react";
import { Container } from 'reactstrap';
import CurrencyInput from 'react-currency-input-field';
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from 'react-toastify'; // Import toast
import { useParams } from "react-router-dom";
import bg from "../../../Images/package_bg.jpg";
import { useNavigate } from "react-router-dom";
const EditStandedForm = () => {
    const [Name, setName] = useState("");
    const [Discription, setDiscription] = useState("");
    const [Price, setPrice] = useState("");
    const [Duration, setDuration] = useState('');
    const [error, setError] = useState(null);
    const maxWords = 100;
    const { id } = useParams();
    const navigate = useNavigate();
    const handleCurrency = (value) => {
        var inputvalue = value;
        if (inputvalue < 0) {
            value = 0;
            toast.error('Cannot input below Zero');
        } else {
            setPrice(inputvalue);
        }
    };

    const handlePromoName = (e) => {
        const value = e.target.value;
        const newValue = value.replace(/[^a-zA-Z\s]/g, '');
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

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/package/package/get/${id}`);
                const { data } = response; // Destructure the data property
                setName(data.Name);
                setDiscription(data.Discription);
                setPrice(data.Price);
                setDuration(data.Duration);
                console.log(data);
            } catch (error) {
                setError(error);
                console.log('Error fetching package: ', error);
            }
        };
        fetchPackage();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8070/package/package/${id}`, {
            Name: Name,
            Price: Price,
            Discription: Discription,
            Duration: Duration
        })
        .then(response => {
            Swal.fire({
                title: "Success",
                text: "Promo updated successfully",
                icon: "success",
            }).then(() => {
                console.log('Promo updated successfully', response.data);

                navigate('/pkg/createdstanded');
            });

        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Cannot update Promo",
                icon: "error",
            }).then(() => {
                console.log('Cannot update Promo', error);
            });
        });
    };

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };
    
    return (
        <div className="flex h-full justify-center items-center" style={bgStyle}>
            <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 flex flex-col gap-y-4">
                <p className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }}>Edit Standed Package</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="Name" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>
                                Package Name:
                            </label>
                            <input
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                type="text"
                                id="Name"
                                name="name"
                                value={Name}
                                onChange={handlePromoName}
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
                                value={Discription}
                                onChange={handlePromoDesc}
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                required
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
                                prefix="LKR"
                                value={Price}
                                onValueChange={handleCurrency}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="Date" className="text-white flex items-center pl-5 font-bold text-2xl font-size" style={{ WebkitTextStroke: '1px black' }}>
                                Package Validity:
                            </label>
                            <input
                                type="date"
                                id="Date"
                                name="Date"
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                value={Duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button type="reset" className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-red-700 transition duration-300">
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">
                                Save
                                </button>
                        </div>
                        {error && <div>{error}</div>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditStandedForm;