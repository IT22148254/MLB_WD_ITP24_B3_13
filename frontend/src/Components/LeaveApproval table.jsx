import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LeaveApproval = () => {

    //let navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:8000/epmloyee/service");
        // console.log(response.data);
        setLeaves(response.data);
      } catch (error) {
        console.error("Failed to fetch Orders:", error);
      }
    };

    fetchLeaves();
  }, []);

  
  const handleApprove = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept it!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Success",
                text: "Leave Approved successfully",
                icon: "success",
            }).then(() => {
                console.log('new package added')
            })
        }
    });
}
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8000/leaves/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: "Rejected",
              text: "leave rejected",
              icon: "success",
            }).then(() => {
              // Refresh the page
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to reject the Leave.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting Coach change:", error);
        }
      }
    });
  };

    return ( 

        <div className="w-full">
      <div className="grid grid-cols-8 bg-cyan-400">
        <div className="border-2 border-black p-3">Employee Name </div>
        <div className="border-2 border-black p-3">StartDate </div>
        <div className="border-2 border-black p-3">End Date</div>
        <div className="border-2 border-black p-3">Reason</div>
        <div className="border-2 border-black p-3">Approve</div>
        <div className="border-2 border-black p-3">Delete</div>
      </div>
      <div
        className="w-full overflow-auto "
        style={{
          maxHeight: "450px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {leaves &&
          leaves.map((leave, index) => (
            <div
              className={`grid grid-cols-8 ${
                index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
              }`}
              key={leave.id}
            >
        
              <div className="border-2 border-black p-2">{leave.empName}</div>
              <div className="border-2 border-black p-2">{leave.startDate.slice(0,10)}</div>
              <div className="border-2 border-black p-2">
                {leave.endDate.slice(0,10)}
              </div>
              <div className="border-2 border-black p-2">
                {leave.reason}
              </div>
              {/*this button for Approve*/}
              <div className="border-2 border-black p-2">
                <button
                  className="bg-red-500
                   border-2 border-black rounded-full p-1 px-4 text-black font-bold"
                   onClick={handleApprove
                }
                >
                  Approve
                </button>
              </div>
              <div className="border-2 border-black p-2">
                <button
                  className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                  onClick={() =>
                handleReject(leave.id)
                 }
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>

     );
}
 
export default LeaveApproval;