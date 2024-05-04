// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import bg from "../../Images/bg_main.jpg";

// const SupplierTable = () => {
//   const [suppliers, setSuppliers] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredSuppliers, setFilteredSuppliers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8070/supplier');
//         setSuppliers(data.result);
//         setFilteredSuppliers(data.result);
//       } catch (error) {
//         console.error('Failed to fetch Suppliers', error);
//       }
//     };
//     fetchSuppliers();
//   }, []);

//   useEffect(() => {
//     const filtered = filterSuppliers(suppliers, searchInput);
//     setFilteredSuppliers(filtered);
//   }, [searchInput, suppliers]);

//   const filterSuppliers = (suppliers, searchText) => {
//     return suppliers.filter((supplier) =>
//       supplier.Name.toLowerCase().startsWith(searchText.toLowerCase())
//     );
//   };

//   const handleEdit = (id) => {
//     navigate(`/sup/editsup/${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!',
//       });

//       const response = await axios.delete(`http://localhost:8070/supplier/${id}`);

//       if (response.status === 200) {
//         Swal.fire({
//           title: 'Deleted!',
//           text: 'Your file has been deleted.',
//           icon: 'success',
//         }).then(() => {
//           window.location.reload();
//         });
//       } else {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Failed to delete the Supplier.',
//           icon: 'error',
//         });
//       }
//     } catch (error) {
//       console.error('Error deleting Supplier:', error);
//     }
//   };

//   const handleCreateReport = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Supplier Details Report', 14, 22);

//     const columns = [
//       { header: 'Supplier Name', dataKey: 'Name' },
//       { header: 'Email', dataKey: 'Email' },
//       { header: 'Phone', dataKey: 'Phone' },
//       { header: 'Address', dataKey: 'Address' },
//     ];

//     const rows = filteredSuppliers.map((sup) => ({
//       Name: sup.Name,
//       Email: sup.Email,
//       Phone: sup.Phone,
//       Address: sup.Address,
//     }));

//     doc.autoTable(columns, rows);
//     doc.save('Supplier Report.pdf');
//   };

//   return (
//     <div
//       className="h-screen flex justify-center items-center"
//       style={{
//         backgroundImage: `url(${bg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center',
//       }}
//     >
//       <div className="flex flex-col justify-center items-center h-screen mt-10 mb-10">
//         <div className="bg-black/45 h-auto w-4/5 rounded-[50px] py-12 px-14 gap -inset-y-8">
//           <p className="text-4xl text-white font-bold mb-4">Suppliers Table</p>
//           <div className="mb-4">
//             <div className="h-9 bg-white/70 w-1/2 rounded-lg">
//               <input
//                 placeholder="Search by Name"
//                 className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none focus:outline-none"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-6 bg-cyan-400 text-white">
//             <div className="border-2 border-black p-3">Name</div>
//             <div className="border-2 border-black p-3 ">Email</div>
//             <div className="border-2 border-black p-3">Phone</div>
//             <div className="border-2 border-black p-3 style={">Address</div>
//             <div className="border-2 border-black p-3">Edit</div>
//             <div className="border-2 border-black p-3">Delete</div>
//           </div>
//           <div
//             className="w-full overflow-auto"
//             style={{ maxHeight: '450px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {filteredSuppliers &&
//               filteredSuppliers.map((sup, index) => (
//                 <div
//                   className={`grid grid-cols-6 ${index % 2 === 0 ? 'bg-cyan-200' : 'bg-cyan-400'}`}
//                   key={sup._id}
//                 >
//                   <div className="border-2 border-black p-2 text-black">{sup.Name}</div>
//                   <div className="border-2 border-black p-2 text-black ">{sup.Email}</div>
//                   <div className="border-2 border-black p-2 text-black">{sup.Phone}</div>
//                   <div className="border-2 border-black p-2 text-black">{sup.Address}</div>
//                   <div className="border-2 border-black p-2">
//                     <button
//                       className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
//                       onClick={() => handleEdit(sup._id)}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                   <div className="border-2 border-black p-2">
//                     <button
//                       className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
//                       onClick={() => handleDelete(sup._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//             onClick={handleCreateReport}
//           >
//             Generate Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupplierTable;


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container} from 'reactstrap'
import bg from "../../Images/bg_main.jpg";



const Itemtable = () => {

   

    const[items,setItems] = useState([])

    useEffect(()=>{

        const fetchItems = async ()=>{

            try {
                const response =  await axios.get(" http://localhost:8000/Items")
                setItems(response.data)
                
            } catch (error) {
                console.error("Failed to fetch Items", error);
            }
        }
        fetchItems()
    }, [])

    useEffect(() => {
        console.log("Items: ", items);
        // setData(employees);
      }, [items]);

    return ( 


      <div
            className="h-screen flex justify-center items-center"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          >
        <section>
            <Container>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="bg-black/45 w-auto h-auto rounded-[50px] py-12 px-14 gap -inset-y-8">
                <div className="text-4xl text-white font-bold align-top mb-8 text-center" style={{ WebkitTextStroke: '1px black' }}>Inventory</div>
                  <div className="w-full">
                      <div className="grid grid-cols-4 bg-cyan-400">
                      <div className="border-2 border-black p-3">Item</div>
                      <div className="border-2 border-black p-3">Quantity in Stock</div>
                      <div className="border-2 border-black p-3">Sold this month</div>
                      <div className="border-2 border-black p-3">Need to Purchase</div>
                  </div>
                <div
                    className="w-full overflow-auto "
                    style={{
                    maxHeight: "450px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    }}
                >
                {items &&
                items.map((item, index) => (
                    <div
                    className={`grid grid-cols-8 ${
                        index % 2 == 0 ? "bg-cyan-200 " : "bg-cyan-400 "
                    }`}
                    key={item.id}
                    >
                    <div className="border-2 border-black p-2">{item.itemName}</div>
                    <div className="border-2 border-black p-2">{item.Qty}</div>
                    <div className="border-2 border-black p-2">
                        {item.soldThisMonth}
                    </div>  
                    <div className="border-2 border-black p-2">
                        {item.needToPurchase}
                    </div>  
                    </div>
                ))}
                </div>
            </div>
            </div>
            </div>
        </Container>
    </section>  
    </div>    
     );
}
 
export default Itemtable;