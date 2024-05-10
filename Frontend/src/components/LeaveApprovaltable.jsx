import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import bg from "../assets/images/bg_main.jpg";



const Leave = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const { data } = await axios.get('http://localhost:8070/employee/leaves');
        setLeaves(data.result);
      } catch (error) {
        console.error('Failed to fetch Leaves', error);
      }
    };
    fetchLeaves();
  }, []);
  const handleEdit = (id) => {
    // navigate(`/sup/editsup/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8070/leaves/${id}`);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Leave has been deleted.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the leave.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };

  const handleCreateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Leave Details Report', 14, 22);

    const columns = [
      { header: 'Reason', dataKey: 'reason' },
      { header: 'Start Date', dataKey: 'startDate' },
      { header: 'End Date', dataKey: 'endDate' },
      { header: 'Edit', dataKey: 'edit' }, // New column for Edit button
    ];

    const rows = leaves.map((leave) => ({
      reason: leave.reason,
      startDate: new Date(leave.startDate).toLocaleDateString(),
      endDate: new Date(leave.endDate).toLocaleDateString(),
      edit: <button className="bg-blue-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold">Edit</button>, // Edit button for each entry
    }));

    doc.autoTable(columns, rows);
    doc.save('Leave Report.pdf');
  };
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100%",
  };
  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="flex h-full justify-center items-center" style={bgStyle}>
        <div className="bg-black/45 h-auto w-4/5 rounded-[50px] py-12 px-14 gap -inset-y-8">
          <p className="text-4xl text-white font-bold mb-4">Leave Table</p>
          <div className="grid grid-cols-5 bg-cyan-400 text-white">
            <div className="border-2 border-black p-3">Reason</div>
            <div className="border-2 border-black p-3">Start Date</div>
            <div className="border-2 border-black p-3">End Date</div>
            <div className="border-2 border-black p-3">Edit</div> {/* Updated header */}
            <div className="border-2 border-black p-3">Delete</div>
          </div>
          <div
            className="w-full overflow-auto"
            style={{ maxHeight: '450px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {leaves && leaves.map((leave, index) => (
              <div
                className={`grid grid-cols-5 ${index % 2 === 0 ? 'bg-cyan-200' : 'bg-cyan-400'}`}
                key={leave._id}
              >
                <div className="border-2 border-black p-2 text-black">{leave.reason}</div>
                <div className="border-2 border-black p-2 text-black">{new Date(leave.startDate).toLocaleDateString()}</div>
                <div className="border-2 border-black p-2 text-black">{new Date(leave.endDate).toLocaleDateString()}</div>
                <div className="border-2 border-black p-2">{   <button
                      className=" border-2 bg-purple-400  border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleEdit(leave._id)}
                    >
                     Approve
                    </button>}</div> {/* Placeholder for Edit button */}
                <div className="border-2 border-black p-2">
                  <button
                    className=" border-2 bg-green-600 border-black rounded-full p-1 px-4 text-white font-bold"
                    onClick={() => handleDelete(leave._id)}
                  >
                   Reject
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

export default Leave;
