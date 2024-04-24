import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import bg from "../../Images/bg_main.jpg";


const SupplierTable = () => {
  // const bgStyle = {
  //   backgroundImage: `url(${bg})`, 
  //   backgroundSize: "cover",
  //   height: "100%",
    
  // };

  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/sup/editsup/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      const response = await axios.delete(`http://localhost:8070/supplier/${id}`);

      if (response.status === 200) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete the Supplier.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error deleting Supplier:', error);
    }
  };

  const handleCreateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Supplier Details Report', 14, 22);

    const columns = [
      { header: 'Supplier Name', dataKey: 'Name' },
      { header: 'Email', dataKey: 'Email' },
      { header: 'Phone', dataKey: 'Phone' },
      { header: 'Address', dataKey: 'Address' },
    ];

    const rows = suppliers.map((sup) => ({
      Name: sup.Name,
      Email: sup.Email,
      Phone: sup.Phone,
      Address: sup.Address,
    }));

    doc.autoTable(columns, rows);
    doc.save('Supplier Report.pdf');
  };

  return (
   
      <div
        className="h-screen flex justify-center items-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
    
      <div className="flex flex-col justify-center items-center h-screen mt-10 mb-10">
        <div className="bg-black/45 h-auto w-4/5 rounded-[50px] py-12 px-14 gap -inset-y-8">
          <p className="text-4xl text-white font-bold mb-4">Suppliers Table</p>
          <div className="grid grid-cols-6 bg-cyan-400 text-white">
            <div className="border-2 border-black p-3">Name</div>
            <div className="border-2 border-black p-3 ">Email</div>
            <div className="border-2 border-black p-3">Phone</div>
            <div className="border-2 border-black p-3 style={">Address</div>
            <div className="border-2 border-black p-3">Edit</div>
            <div className="border-2 border-black p-3">Delete</div>
          </div>
          <div
            className="w-full overflow-auto"
            style={{ maxHeight: '450px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {suppliers &&
              suppliers.map((sup, index) => (
                <div
                  className={`grid grid-cols-6 ${index % 2 === 0 ? 'bg-cyan-200' : 'bg-cyan-400'}`}
                  key={sup.id}
                >
                  <div className="border-2 border-black p-2 text-black">{sup.Name}</div>
                  <div className="border-2 border-black p-2 text-black ">{sup.Email}</div>
                  <div className="border-2 border-black p-2 text-black">{sup.Phone}</div>
                  <div className="border-2 border-black p-2 text-black">{sup.Address}</div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleEdit(sup._id)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleDelete(sup._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleCreateReport}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default SupplierTable;