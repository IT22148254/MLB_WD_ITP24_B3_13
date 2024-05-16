import { useState, useEffect } from "react"
import { useNavigate, } from "react-router-dom"
import { Container } from 'reactstrap'
import Swal from "sweetalert2";
import axios from "axios";


const SupOrder = () => {


    const[orderID, setorderID] = useState('')
    const [suppliers, setSuppliers] = useState([]);
    const[Supplier, setSupplier] = useState('')
    const[PrName, setPrName] = useState('')
    const[quantity, setQuantity] = useState(0) 
    const navigate = useNavigate();

    const [error, setError] = useState(null)

    const handleQuantity = (e)=>{
        var inputValue = e.target.value;
    // Ensure the input value is a valid integer
    if (/^-?\d*$/.test(inputValue)) {
        if (inputValue < 0) {
            //ensure the input value is not less than 0
            inputValue = 0;
            Swal.fire({
                title: "Error",
                text: "Cannot input below zero",
                icon: "error",
              }).then(()=>{
                console.log('Cannot input below zero')
              })
          }else{
            setQuantity(inputValue);
          }
    }else{
        Swal.fire({
            title: "Error",
            text: "Only integers allowed",
            icon: "error",
          }).then(()=>{
            console.log('Only integers allowed')
          })

    }}

    const handlePrChange = (e) => {
      const inputValue = e.target.value;
      // Regular expression to allow only alphabetic characters and spaces
      // const regex = /^[a-zA-Z\s]*$/;
      // // If the input value matches the regex, update the state
      // if (regex.test(inputValue)) {
      //   setPrName(inputValue);
      // }
       setPrName(inputValue)
    };
  

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
    
      //
      

    const handleSubmit = async (e) => {
        e.preventDefault()

        const supOrder = {Supplier, PrName, quantity}

                const response = await fetch('http://localhost:8070/supplier/order/add', {
                    method: 'POST',
                    body: JSON.stringify(supOrder),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const json = await response.json()

                if (!response.ok) {
                    setError(json.error)
                }

                if(response.ok){

                    
                    setSupplier('')
                    setPrName('')
                    setQuantity(0)

                    setError(null)

                    Swal.fire({
                        title: "Success",
                        text: "new Order added successfully",
                        icon: "success",
                      }).then(()=>{
                        console.log('new Order added', json)
                      })
                      
                      navigate("/sup/placedOrders");
            }}

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
                                        onChange={handlePrChange}
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
}
 
export default SupOrder;