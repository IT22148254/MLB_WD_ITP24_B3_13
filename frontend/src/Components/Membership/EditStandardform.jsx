import { useState, useEffect } from "react"
import { useNavigate, useParams} from "react-router-dom"
import { Container } from 'reactstrap'
import axios from 'axios'


const EditStandardForm = () => {

    // these use states are mine -Rk
    const { id } = useParams();
    const [stPackageName, setStPackageName] = useState("")
    const [stPackageDescription, setStPackageDescription] = useState("")
    const [stPackagePrice, setStPackagePrice] = useState("")

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/stPackages/${id}`);
                setStPackageName(response.data.stPackageName);
                setStPackageDescription(response.data.stPackageDescription);
                setStPackagePrice(response.data.stPackagePrice);

            } catch (error) {
                console.log('Error fetching package: ', error);
            }
        };

        
        fetchPackage();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
    
        axios.patch(`/api/stPackages/${id}`, {
            stPackageName: stPackageName,
            stPackagePrice: stPackagePrice,
            stPackageDescription: stPackageDescription
        })
            .then(response => {
                console.log(response.data);
                // handle success
                window.alert('Data has been updated successfully');
                console.log('Successfully updated the Standard Package');
                window.location = "http://localhost:3000/standardpackages";
            })
            .catch(error => {
                console.log(error);
                // handle error
                console.log("error when update the data");
                window.alert('Data is not updated');
                window.location.reload();
            });
    };

    const bgStyle = {
        backgroundImage: `url(${bg})`, 
        backgroundSize: "cover",
        height: "100vh",
    };

    //value and onChanges are mine -Rk

    return ( 
        <div style={bgStyle}>
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
                                    value={stPackageName}
                                    onChange={(e)=>setStPackageName(e.target.value)}
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
                                    value={stPackageDescription}
                                    onChange={(e)=>setStPackageDescription(e.target.value)}
                                    className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="Price" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>
                                    Package Price:
                                </label>
                                <input
                                    type="text"
                                    id="Price"
                                    name="Price"
                                    value={stPackagePrice}
                                    onChange={(e)=>setStPackagePrice(e.target.value)}
                                    className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                    required
                                />
                            </div>
                            {/* <div className="flex justify-between items-center">
                                <label htmlFor="Date" className="text-white flex items-center pl-5 font-bold text-2xl font-size" style={{ WebkitTextStroke: '1px black' }}>
                                    Package Validity:
                                </label>
                                <input
                                    type="date"
                                    id="Date"
                                    name="Date"
                                    className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                    required
                                />
                            </div> */}
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
        </div>      
     );
}
 
export default EditStandardForm;