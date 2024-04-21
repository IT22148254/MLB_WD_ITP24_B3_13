import React, { useState } from "react";
//import Swal from "sweetalert2";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

const EditSupplierForm = ({ id }) => {
  //let navigate = useNavigate();

  const [supName, setSupName] = useState('')
  const [supEmail, setSupEmail] = useState('')
  const [supPhone, setSupPhone] = useState('')
  const [supAddress, setSupAddress] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("id: ", id);
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/employee/find/${id}`
        );
        const supplier = response.data;

        setSupName(supplier.supName);
        setSupEmail(supplier.supEmail);
        setSupPhone(supplier.supPhone);
        setSupAddress(supplier.supAddress);
        // setContactNo(employee.contactNo);
        // setEmail(employee.email);
        // setAddress(employee.address);
        // setQualifications(employee.qualifications);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchSupplier();
  }, []);

  

  const handleSubmit = async () => {
   
    try {
      const supplierData = {
        //employeeId: "EMP000",
        supName,
        supEmail,
        supPhone,
        supAddress,
      };

      const response = await axios.post(
        "http://localhost:8000/employee/create",
        supplierData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Successfully Edited",
          icon: "success",
        });
        // Clear all the text fields
        setSupName("");
        setSupEmail("");
        setSupPhone("");
        setSupAddress("");
        setError(null)
      }
    } catch (error) {
      console.error("Error creating Supplier:", error);
    }
  };

  // useEffect(() => {
  //   console.log("id: ", id);
  //   const fetchEmployee = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/employee/${id}`
  //       );
  //       const employee = response.data;

  //       setFullName(employee.fullName);
  //       setNic(employee.nic);
  //       setGender(employee.gender);
  //       setDob(employee.dob);
  //       setContactNo(employee.contactNo);
  //       setEmail(employee.email);
  //       setAddress(employee.address);
  //       setQualifications(employee.qualifications);
  //     } catch (error) {
  //       console.error("Error fetching employee:", error);
  //     }
  //   };

  //   fetchEmployee();
  // }, [id]);


  return (
    <section>
    <Container>
    <div className="flex flex-col justify-center items-center h-screen">
         <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
            <div /*className="title" */ className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Edit Supplier</div>
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
                        type="text"
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
};

export default EditSupplierForm;
