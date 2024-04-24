import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { useEffect } from "react";
const EditSupplierForm = () => {

  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Phone, setPhone] = useState('')
  const [Address, setAddress] = useState('')
  const [error, setError] = useState(null)
  const {id} = useParams();

  useEffect(() => {
    console.log("id: ", id);
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/supplier/get/${id}`
        );
        const supplier = response.data.supplier;

        setName(supplier.Name);
        setEmail(supplier.Email);
        setPhone(supplier.Phone);
        setAddress(supplier.Address);
        // setContactNo(employee.contactNo);
        // setEmail(employee.email);
        // setAddress(employee.address);
        // setQualifications(employee.qualifications);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchSupplier();
  }, [id]);

  

  const handleSubmit = async (e) => {
   
    e.preventDefault()

    axios.put(`http://localhost:8070/supplier/${id}`, {
        Name: Name,
        Email: Email,
        Phone: Phone,
        Address: Address
    })
        .then(response => {
            Swal.fire({
                title: "Success",
                text: " Supplier updated successfully",
                icon: "success",
            }).then(() => {
                console.log('Supplier updated successfully', response.data)
                setError(null)
            })
            //window.location = "http://localhost:3000/standardpackages";
        })
        .catch(error => {

            Swal.fire({
                title: "Error",
                text: " Cannot update Supplier",
                icon: "error",
            }).then(() => {
                console.log('Cannot update Supplier', error)
            })


        });
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
                    <label  htmlFor="Name" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl"  style={{ WebkitTextStroke: '1px black' }}>Supplier Name:</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                        pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">                       
                    <label htmlFor="Email" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Email:</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                        pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor="Phone" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>Contact No:</label>
                    <input
                        type="text"
                        id="Phone"
                        name="Phone"
                        value={Phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                        pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                        required />
                </div>
                <div className="flex justify-between items-center">  
                    <label htmlFor="Address" className="text-white flex items-center pl-5 font-bold text-2xl font-size" style={{ WebkitTextStroke: '1px black' }}>Address:</label>
                    <textarea id="Address" name="Address" className="w-3/5 bg-white/70 e h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                        pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500" 
                        value={Address}
                        onChange={(e)=>setAddress(e.target.value)}></textarea>
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
            <button>Add Supplier</button>
    </Container>
</section>
  );
};

export default EditSupplierForm;
