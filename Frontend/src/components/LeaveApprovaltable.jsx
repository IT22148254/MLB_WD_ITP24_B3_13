import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import bg from "../assets/images/bg_main.jpg";
import emailjs from 'emailjs-com';

const Leave = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8070/employee/leaves"
        );
        const updatedLeaves = await Promise.all(
          data.result.map(async (leave) => {
            try {
              const { data: employeeData } = await axios.get(
                `http://localhost:8070/employee/employee/findByName/${leave.employeeName}`
              );
              return {
                ...leave,
                email: employeeData.email || "", // Add employee email to leave data
              };
            } catch (error) {
              console.error("Error fetching employee data:", error);
              return {
                ...leave,
                email: "", // If there's an error, set email to an empty string
              };
            }
          })
        );
        setLeaves(updatedLeaves);
        console.log(updatedLeaves);
      } catch (error) {
        console.error("Failed to fetch Leaves", error);
      }
    };

    fetchLeaves();
  }, []);

  const handleDelete = (id) => {
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
          const response = await axios.delete(
            `http://localhost:8070/employee/leave/${id}`
          );
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
              text: "Failed to delete the leave.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting leave:", error);
        }
      }
    });
  };

  const handleApprove = async (leaveId) => {
    try {
      const response = await axios.put(
        `http://localhost:8070/employee/leave/${leaveId}`,
        { status: "approved" }
      );

      if (response.status === 200) {
        // Handle successful approval
        Swal.fire({
          title: "Success!",
          text: "Leave approved successfully.",
          icon: "success",
        }).then(() => {
          // Refresh the page
          window.location.reload();
        });
      } else {
        // Handle error
        Swal.fire({
          title: "Error!",
          text: "Failed to approve the leave.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const handleReject = async (leaveId) => {
    try {
      const response = await axios.put(
        `http://localhost:8070/employee/leave/${leaveId}`,
        { status: "rejected" }
      );

      if (response.status === 200) {
        // Handle successful rejection
        Swal.fire({
          title: "Success!",
          text: "Leave rejected successfully.",
          icon: "success",
        }).then(() => {
          // Refresh the page
          window.location.reload();
        });
      } else {
        // Handle error
        Swal.fire({
          title: "Error!",
          text: "Failed to reject the leave.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  const handleCreateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Leave Details Report", 14, 22);

    const columns = [
      { header: "Employee Name", dataKey: "employeeName" },
      { header: "Email", dataKey: "email" },
      { header: "Start Date", dataKey: "startDate" },
      { header: "End Date", dataKey: "endDate" },
      { header: "Status", dataKey: "status" },
      { header: "Delete", dataKey: "delete" }, // New column for delete button
      { header: "Send Email", dataKey: "sendEmail" }, // New column for send email button
    ];

    const rows = leaves.map((leave) => ({
      employeeName: leave.employeeName,
      email: leave.email,
      startDate: new Date(leave.startDate).toLocaleDateString(),
      endDate: new Date(leave.endDate).toLocaleDateString(),
      status: leave.status,
      delete: (
        <button
          className="border-2 bg-red-600 border-black rounded-full p-1 px-4 text-white font-bold"
          onClick={() => handleDelete(leave._id)}
        >
          Delete
        </button>
      ),
      sendEmail: (
        <button
          className="border-2 bg-green-600 border-black rounded-full p-1 px-4 text-white font-bold"
          onClick={() => handleSendEmail(leave.email, leave.status)} // Pass email and status to handleSendEmail
        >
          Send Email
        </button>
      ),
    }));

    doc.autoTable(columns, rows);
    doc.save("Leave Report.pdf");
  };

  const handleSendEmail = async (email, status) => {
    // Send email using emailjs-com
    emailjs.send('service_b27z6pc', 'template_9y1j719', { from_status: status, from_email: email }, 'zywfAzWm1IL9W5-Mp')
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        Swal.fire({
          title: "Success!",
          text: "Email sent successfully.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to send email.",
          icon: "error",
        });
      });
  };

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100%",
  };

  return (
    <div className="h-screen flex justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 h-auto w-full rounded-[50px] py-12 px-14 gap -inset-y-8">
        <p className="text-4xl text-white font-bold mb-4">Leave Table</p>
        <div className="grid grid-cols-8 bg-cyan-400 text-white">
          <div className="border-2 border-black p-3">Employee Name</div>
          <div className="border-2 border-black p-3">Email</div>
          <div className="border-2 border-black p-3">Start Date</div>
          <div className="border-2 border-black p-3">End Date</div>
          <div className="border-2 border-black p-3">Status</div>
          <div className="border-2 border-black p-3">Actions</div>
          <div className="border-2 border-black p-3">Delete</div>
          <div className="border-2 border-black p-3">Send Email</div> {/* New column */}
        </div>
        <div
          className="w-full overflow-auto"
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
                  index % 2 === 0 ? "bg-cyan-200" : "bg-cyan-400"
                }`}
                key={leave._id}
              >
                <div className="border-2 border-black p-2 text-black">
                  {leave.employeeName}
                </div>
                <div className="border-2 border-black p-2 text-black">
                  {leave.email}
                </div>
                <div className="border-2 border-black p-2 text-black">
                  {new Date(leave.startDate).toLocaleDateString()}
                </div>
                <div className="border-2 border-black p-2 text-black">
                  {new Date(leave.endDate).toLocaleDateString()}
                </div>
                <div className="border-2 border-black p-2 text-black">
                  {leave.status}
                </div>
                <div className="border-2 border-black p-2">
                  <button
                    className="border-2 bg-purple-400 border-black rounded-full p-1 px-4 text-white font-bold mr-2"
                    onClick={() => handleApprove(leave._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="border-2 bg-green-600 border-black rounded-full p-1 px-4 text-white font-bold mr-2"
                    onClick={() => handleReject(leave._id)}
                  >
                    Reject
                  </button>
                </div>
                <div className="border-2 border-black p-2">
                  <button
                    className="border-2 bg-red-600 border-black rounded-full p-1 px-4 text-white font-bold"
                    onClick={() => handleDelete(leave._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="border-2 border-black p-2">
                  <button
                    className="border-2 bg-green-600 border-black rounded-full p-1 px-4 text-white font-bold"
                    onClick={() => handleSendEmail(leave.email, leave.status)}
                  >
                    Send Email
                  </button>
                </div> {/* New button for sending email */}
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
  );
};

export default Leave;
