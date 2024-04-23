import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeeTable = ({ employees }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleEdit = (id) => {
    console.log(`Edit employee with id: ${id}`);
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id, empId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios({
            method: "delete",
            url: `http://localhost:8070/employee/employee/delete`,
            data: {
              _id: id,
              employeeId: empId,
            },
          });

          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => {
              // Refresh the page
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the employee.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting employee:", error);
        }
      }
    });
  };

  const handleCreateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Employee Report', 14, 22);

    const columns = [
      { header: 'Full Name', dataKey: 'fullName' },
      { header: 'NIC', dataKey: 'nic' },
      { header: 'Gender', dataKey: 'gender' },
      { header: 'Contact No', dataKey: 'contactNo' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Address', dataKey: 'address' }
    ];

    const rows = employees.map(employee => ({
      fullName: employee.fullName,
      nic: employee.nic,
      gender: employee.gender,
      contactNo: employee.contactNo,
      email: employee.email,
      address: employee.address
    }));

    doc.autoTable(columns, rows);
    doc.save('Employee Report.pdf');
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-8 bg-cyan-400">
        <div className="border-2 border-black p-3">Full Name</div>
        <div className="border-2 border-black p-3">NIC</div>
        <div className="border-2 border-black p-3">Gender</div>
        <div className="border-2 border-black p-3">Contact No</div>
        <div className="border-2 border-black p-3">Email</div>
        <div className="border-2 border-black p-3">Address</div>
        <div className="border-2 border-black p-3">Edit</div>
        <div className="border-2 border-black p-3">Delete</div>
      </div>
      <div className="w-full overflow-auto" style={{ maxHeight: "450px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {employees &&
          employees.map((employee, index) => (
            <div className={`grid grid-cols-8 ${index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "}`} key={employee.id}>
              <div className="border-2 border-black p-2">{employee.fullName}</div>
              <div className="border-2 border-black p-2">{employee.nic}</div>
              <div className="border-2 border-black p-2">{employee.gender}</div>
              <div className="border-2 border-black p-2">{employee.contactNo}</div>
              <div className="border-2 border-black p-2">{employee.email}</div>
              <div className="border-2 border-black p-2">{employee.address}</div>
              <div className="border-2 border-black p-2">
                <button className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold" onClick={() => handleEdit(employee._id)}>Edit</button>
              </div>
              <div className="border-2 border-black p-2">
                <button className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold" onClick={() => handleDelete(employee._id, employee.employeeId)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
      {/* Generate PDF Report Button */}
      <div className="flex justify-between mt-5 ">
      <button className="ml-20 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/calculator')}>
        Calculate Salary
      </button>
      <button className="mr-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreateReport}>
        Generate Report
      </button>
    </div>
    </div>
  );
};

export default EmployeeTable;
