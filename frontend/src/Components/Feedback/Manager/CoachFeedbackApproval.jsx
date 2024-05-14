import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import bg from "../../../Images/feedback.jpeg";

const CoachFeedbackApproval = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/feedback/coacha"
        );
        setFeedbacks(response.data.result);
        setFilteredFeedbacks(response.data.result);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    // Retrieve received feedback IDs from local storage
    const storedReceivedFeedbacks = JSON.parse(localStorage.getItem("receivedFeedbacks"));
    if (storedReceivedFeedbacks) {
      setReceivedFeedbacks(storedReceivedFeedbacks);
    }
  }, []);

  useEffect(() => {
    // Update local storage when received feedback IDs change
    localStorage.setItem("receivedFeedbacks", JSON.stringify(receivedFeedbacks));
  }, [receivedFeedbacks]);

  const handleEdit = (id) => {
    navigate(`/fbk/coachfeedbackedit/${id}`);
  };

  const handleDelete = (id) => {
    // Your delete logic
  };

  const handleCreateReport = () => {
    // Your report generation logic
  };

  const handleAddFeedback = () => {
    navigate("/fbk/coachfeedback");
  };

  const handleReceived = async (id) => {
    if (!receivedFeedbacks.includes(id)) {
      try {
        const response = await axios.post(
          `http://localhost:8070/feedback/coach/add`,
          filteredFeedbacks.find((feedback) => feedback._id === id)
        );
        if (response.status === 200) {
          setReceivedFeedbacks([...receivedFeedbacks, id]);
          Swal.fire({
            title: "Confirmed!",
            text: "Feedback confirmed successfully.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error receiving feedback:", error);
      }
    } else {
      Swal.fire({
        title: "Already Confirmed!",
        text: "This feedback has already been confirmed.",
        icon: "warning",
      });
    }
  };

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-4/5 rounded-[50px] py-12 px-12 gap -inset-y-8">
        <div className="w-full">
          <div
            className="text-4xl text-white font-bold align-top mb-6"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Coach Feedback Approval
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
          <div className="grid grid-cols-8 bg-cyan-400">
            <div className="border-2 border-black p-3">Name</div>
            <div className="border-2 border-black p-3">Email</div>
            <div className="border-2 border-black p-3">Rating</div>
            <div className="border-2 border-black p-3">Opinion</div>
            <div className="border-2 border-black p-3">Coach</div>
            <div className="border-2 border-black p-3">Edit</div>
            <div className="border-2 border-black p-3">Delete</div>
            <div className="border-2 border-black p-3">Received</div>
          </div>
          <div
            className="w-full overflow-auto "
            style={{
              maxHeight: "450px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredFeedbacks &&
              filteredFeedbacks.map((feedback, index) => (
                <div
                  className={`grid grid-cols-8 ${
                    index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
                  }`}
                  key={feedback._id}
                >
                  {/* Render feedback details */}
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
                    {feedback.Coach}
                  </div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleEdit(feedback._id)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleDelete(feedback._id)}
                    >
                      Delete
                    </button>
                  </div>
                  {/* Render Received button */}
                  <div className="border-2 border-black p-2">
                    <button
                      className={`border-2 rounded-full p-1 px-4 text-white font-bold ${
                        receivedFeedbacks.includes(feedback._id)
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      onClick={() => handleReceived(feedback._id)}
                      disabled={receivedFeedbacks.includes(feedback._id)}
                    >
                      {receivedFeedbacks.includes(feedback._id)
                        ? "Confirmed"
                        : "Received"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {/* Button to generate feedback report */}
          <button
            className="absolute bottom-4 right-1/4 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-9"
            onClick={handleCreateReport}
          >
            Generate Feedback Report
          </button>

          {/* Button to add feedback */}
          <button
            className="absolute bottom-4 left-1/4 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-9 "
            onClick={handleAddFeedback}
          >
            Add coach Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachFeedbackApproval;
