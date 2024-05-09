import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import bg from "../../Images/bg_main.jpg";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const { data } = await axios.get('http://localhost:8070/employee/service');
        setLeaves(data);
      } catch (error) {
        console.error('Failed to fetch Leaves', error);
      }
    };
    fetchLeaves();
  }, []);

  useEffect(() => {
    const filtered = filterLeaves(leaves, searchInput);
    if (Array.isArray(filtered)) {
      setFilteredLeaves(filtered);
    } else {
      console.error('filteredLeaves is not an array:', filtered);
    }
  }, [searchInput, leaves]);

  const filterLeaves = (leaves, searchText) => {
    if (!Array.isArray(leaves)) {
      console.error('leaves is not an array:', leaves);
      return [];
    }
    return leaves.filter((leave) =>
      leave.empName.toLowerCase().includes(searchText.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchText.toLowerCase())
    );
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
      { header: 'Employee Name', dataKey: 'empName' },
      { header: 'Start Date', dataKey: 'startDate' },
      { header: 'End Date', dataKey: 'endDate' },
      { header: 'Reason', dataKey: 'reason' },
    ];

    const rows = filteredLeaves.map((leave) => ({
      empName: leave.empName,
      startDate: leave.startDate.slice(0, 10),
      endDate: leave.endDate.slice(0, 10),
      reason: leave.reason,
    }));

    doc.autoTable(columns, rows);
    doc.save('Leave Report.pdf');
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        // backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="flex flex-col justify-center items-center h-screen mt-10 mb-10">
        <div className="bg-black/45 h-auto w-4/5 rounded-[50px] py-12 px-14 gap -inset-y-8">
          <p className="text-4xl text-white font-bold mb-4">Leave Table</p>
          <div className="mb-4">
            <div className="h-9 bg-white/70 w-1/2 rounded-lg">
              <input
                placeholder="Search by Name or Reason"
                className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 bg-cyan-400 text-white">
            <div className="border-2 border-black p-3">Employee Name</div>
            <div className="border-2 border-black p-3">Start Date</div>
            <div className="border-2 border-black p-3">End Date</div>
            <div className="border-2 border-black p-3">Reason</div>
            <div className="border-2 border-black p-3">Delete</div>
          </div>
          <div
            className="w-full overflow-auto"
            style={{ maxHeight: '450px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredLeaves && Array.isArray(filteredLeaves) && filteredLeaves.map((leave, index) => (
              <div
                className={`grid grid-cols-6 ${index % 2 === 0 ? 'bg-cyan-200' : 'bg-cyan-400'}`}
                key={leave._id}
              >
                <div className="border-2 border-black p-2 text-black">{leave.empName}</div>
                <div className="border-2 border-black p-2 text-black">{leave.startDate.slice(0, 10)}</div>
                <div className="border-2 border-black p-2 text-black">{leave.endDate.slice(0, 10)}</div>
                <div className="border-2 border-black p-2 text-black">{leave.reason}</div>
                <div className="border-2 border-black p-2">
                  <button
                    className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                    onClick={() => handleDelete(leave._id)}
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

export default Leave;
