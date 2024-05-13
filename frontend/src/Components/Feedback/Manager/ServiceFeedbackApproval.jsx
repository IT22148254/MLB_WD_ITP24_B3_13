import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Container } from "reactstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from "../../../Images/feedback.jpeg";

const ServiceFeedbackApproval = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [feedbacks, setFeedbacks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8070/feedback/service");
        setFeedbacks(response.data.result);
        setFilteredFeedbacks(response.data.result);
        // Fetch approval status from local storage or server and update feedbacks accordingly
        const storedApprovalStatus = JSON.parse(localStorage.getItem('feedbackApprovalStatus')) || {};
        const updatedFeedbacks = response.data.result.map(feedback => ({
          ...feedback,
          approved: storedApprovalStatus[feedback._id] || false
        }));
        setFeedbacks(updatedFeedbacks);
        setFilteredFeedbacks(updatedFeedbacks);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const filtered = filterFeedbacks(feedbacks, searchInput);
    setFilteredFeedbacks(filtered);
  }, [searchInput, feedbacks]);

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8070/feedback/service/${id}`, { approved: true });
      if (response.status === 200) {
        toast.success("Feedback Approved");
        // Update the local state
        const updatedFeedbacks = feedbacks.map((feedback) =>
          feedback._id === id ? { ...feedback, approved: true } : feedback
        );
        setFeedbacks(updatedFeedbacks);
        setFilteredFeedbacks(updatedFeedbacks);
        // Update local storage
        const storedApprovalStatus = JSON.parse(localStorage.getItem('feedbackApprovalStatus')) || {};
        localStorage.setItem('feedbackApprovalStatus', JSON.stringify({ ...storedApprovalStatus, [id]: true }));
      } else {
        toast.error("Failed to approve feedback");
      }
    } catch (error) {
      console.error("Error approving feedback:", error);
      toast.error("Failed to approve feedback");
    }
  };

  const handleDelete = (id) => {
    // Function to delete feedback
  };

  const handleCreateReport = () => {
    // Function to create report
  };

  const filterFeedbacks = (feedbacks, searchText) => {
    return feedbacks.filter((feedback) =>
      feedback.UserName.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  return (
    <div className="flex h-full justify-center items-center" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", height: "100vh" }}>
      <div className="bg-black/45 w-4/5 rounded-[50px] py-12 px-12 gap -inset-y-8">
        <div className="w-full">
          <div className="text-4xl text-white font-bold align-top mb-6" style={{ WebkitTextStroke: "1px black" }}>
            Service Feedback list
          </div>
          <div className="mb-4">
            <div className="h-9 bg-white/70 w-1/2 rounded-lg">
              <input
                placeholder="Search by Name"
                className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 bg-cyan-400">
            <div className="border-2 border-black p-3">Name</div>
            <div className="border-2 border-black p-3">Email</div>
            <div className="border-2 border-black p-3">Rating</div>
            <div className="border-2 border-black p-3">Opinion</div>
            <div className="border-2 border-black p-3">Approve</div>
            <div className="border-2 border-black p-3">Reject</div>
          </div>
          <div className="w-full overflow-auto " style={{ maxHeight: "450px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {filteredFeedbacks.map((feedback, index) => (
              <div className={`grid grid-cols-6 ${index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "}`} key={feedback._id}>
                <div className="border-2 border-black p-2">
                  {feedback.UserName}
                </div>
                <div className="border-2 border-black p-2">
                  {feedback.Email}
                </div>
                <div className="border-2 border-black p-2">
                  {feedback.Rating}
                </div>
                <div className="border-2 border-black p-2">
                  {feedback.Comment}
                </div>
                <div className="border-2 border-black p-2">
                  <button
                    disabled={feedback.approved}
                    className={`border-2 rounded-full p-1 px-4 border-black font-bold ${feedback.approved ? 'bg-green-500 text-white' : 'bg-cyan-400 text-white'}`}
                    onClick={() => handleApprove(feedback._id)}
                  >
                    {feedback.approved ? 'Approved' : 'Approve'}
                  </button>
                </div>
                <div className="border-2 border-black p-2">
                  <button
                    className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                    onClick={() => handleDelete(feedback._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute bottom-4 right-1/4 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-9"
            onClick={handleCreateReport}
          >
            Generate Feedback Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeedbackApproval;
