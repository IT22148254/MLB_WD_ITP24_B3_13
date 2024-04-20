import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from 'reactstrap'
import CurrencyInput from 'react-currency-input-field'
import Swal from "sweetalert2";
import axios from "axios";
const EditPromoForm = () => {

    const { id } = useParams();
    const [prPackageName, setprPackageName] = useState("")
    const [prPackageDescription, setprPackageDescription] = useState("")
    const [prPackagePrice, setprPackagePrice] = useState("")
    const [prPackageValidity, setprPackageValidity] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchprPackage = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/PromoPackages/${id}`);
                setprPackageName(response.data.prPackageName);
                setprPackageDescription(response.data.prPackageDescription);
                setprPackagePrice(response.data.prPackagePrice);
                setprPackageValidity(response.data.prPackageValidity)
            } catch (error) {
                setError(error)
                console.log('Error fetching package: ', error);
            }
        };

        
        fetchprPackage();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
    
        axios.patch(`http://localhost:8000/PromoPackages/${id}`, {
            prPackageName: prPackageName,
            prPackagePrice: prPackagePrice,
            prPackageDescription: prPackageDescription,
            prPackageValidity:prPackageValidity
        })
            .then(response => {
                Swal.fire({
                    title: "Success",
                    text: " promo updated successfully",
                    icon: "success",
                  }).then(()=>{
                    console.log('promo updated successfully', response.data)
                  })
                //window.location = "http://localhost:3000/standardpackages";
            })
            .catch(error => {
                
                Swal.fire({
                    title: "Error",
                    text: " Cannot update Promo",
                    icon: "error",
                  }).then(()=>{
                    console.log('Cannot update Promo', error)
                  })
                window.location.reload();
            });
    };


    return (  
        <section>
            <Container>
            <div>
            <div className="flex h-full justify-center items-center ">
                <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 flex flex-col gap-y-4">
                    <p className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Edit Standard Package</p> {/* Moved "Edit Standard" text above the black box */}
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
                                    value={prPackageName}
                                    onChange={(e)=>setprPackageName(e.target.value)}
                                    
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
                                    value={prPackageDescription}
                                    onChange={(e)=>setprPackageDescription(e.target.value)}
                                    className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
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
                                    value={prPackagePrice}
                                    onValueChange={(value) => setprPackagePrice(value)}
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
                                    value={prPackageValidity}
                                    onChange={(e)=>setprPackageValidity(e.target.value)}
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
        </div>      
            </Container>
        </section>
    );
}
 
export default EditPromoForm;