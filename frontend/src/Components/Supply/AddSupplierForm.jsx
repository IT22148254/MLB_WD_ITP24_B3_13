import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import Swal from "sweetalert2";
const AddSupplierForm = () => {

    const [supName, setSupName] = useState('')
    const [supEmail, setSupEmail] = useState('')
    const [supPhone, setSupPhone] = useState('')
    const [supAddress, setSupAddress] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const contactNoRegex = /^\d{10}$/;

        // if (!emailRegex.test(supEmail)) {
        //     Swal.fire({
        //       title: "Invalid email",
        //       text: "Please enter a valid email address",
        //       icon: "error",
        //     });
        //     return;
        //   }
      
        //   if (!contactNoRegex.test(supPhone)) {
        //     Swal.fire({
        //       title: "Invalid contact number",
        //       text: "Contact number should include 10 numbers and contain only digits",
        //       icon: "error",
        //     });
        //     return;
        //   }
        const supplier = {supName,supEmail, supPhone,supAddress}

                const response = await fetch('http://localhost:8000/Suppliers', {
                    method: 'POST',
                    body: JSON.stringify(supplier),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const json = await response.json()

                if (!response.ok) {
                    setError(json.error)
                }

                if(response.ok){

                    // Swal.fire({
                    //     title: "Success",
                    //     text: "new Supplier added successfully",
                    //     icon: "success",
                    //   }).then(()=>{
                    //     console.log('new Supplier added', json)
                    //   })

                    setSupName('')
                    setSupEmail('')
                    setSupPhone('')
                    setSupAddress('')
                    setError(null)
                      
                    {/*navigate('/promoPackages')*/}
            }}
    return ( 
        <section>
            <Container>
            <div className="flex flex-col justify-center items-center h-screen">
                 <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
                    <div /*className="title" */ className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Add Supplier</div>
                    <form method="POST" /*className="add-promo" */ className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-4">

                           <div className="flex justify-between items-center">   {/* check this here */}
                            <label  htmlFor="supName" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl"  style={{ WebkitTextStroke: '1px black' }}>Supplier Name:</label>
                            <input
                                type="text"
                                id="supName"
                                name="supName"
                                value={supName}
                                onChange={(e) => setSupName(e.target.value)}
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                                pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">                       
                            <label htmlFor="supEmail" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Email:</label>
                            <input
                                type="email"
                                id="supEmail"
                                name="supEmail"
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                                pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                value={supEmail}
                                onChange={(e) => setSupEmail(e.target.value)}
                                required />
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="supPhone" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Contact No:</label>
                            <input
                                type="number"
                                id="supPhone"
                                name="supPhone"
                                value={supPhone}
                                onChange={(e)=>setSupPhone(e.target.value)}
                                className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                                pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                required />
                        </div>
                        <div className="flex justify-between items-center">  
                            <label htmlFor="supAddress" className="text-white flex items-center pl-5 font-bold text-2xl font-size" style={{ WebkitTextStroke: '1px black' }}>Address:</label>
                            <textarea id="supAddress" name="supAddress" className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                                pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500" 
                                value={supAddress}
                                onChange={(e)=>setSupAddress(e.target.value)}></textarea>
                        </div>
                        <div className="add-promo-btns">    
                                        <div className="flex justify-center mt-9">
                                            <button type='reset' className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mr-20">Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300">Submit</button>
                                        </div>      
                        </div>
                        {error && <div className="error">{error}</div>} {/*This is my one*/}
                    </form>
                    </div>
                    </div>
            </Container>
        </section>
     );
}
 
export default AddSupplierForm;