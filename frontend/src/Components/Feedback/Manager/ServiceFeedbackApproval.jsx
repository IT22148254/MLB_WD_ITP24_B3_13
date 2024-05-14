import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import bg from "../../../Images/feedback.jpeg";

const ServiceFeedbackApproval = () => {
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
  const [clickedFeedbacks, setClickedFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/feedback/servicea"
        );
        setFeedbacks(response.data.result);
        setFilteredFeedbacks(response.data.result);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    // Retrieve clicked feedback IDs from local storage
    const storedClickedFeedbacks = JSON.parse(localStorage.getItem("clickedFeedbacks"));
    if (storedClickedFeedbacks) {
      setClickedFeedbacks(storedClickedFeedbacks);
    }

    // Retrieve sent feedback IDs from local storage
    const storedSentFeedbackIds = JSON.parse(localStorage.getItem("sentFeedbackIds") || "[]");
  }, []);

  useEffect(() => {
    // Update local storage when clicked feedback IDs change
    localStorage.setItem("clickedFeedbacks", JSON.stringify(clickedFeedbacks));
  }, [clickedFeedbacks]);

  useEffect(() => {
    const filtered = filterFeedbacks(feedbacks, searchInput);
    setFilteredFeedbacks(filtered);
  }, [searchInput, feedbacks]);

  const handleEdit = (id) => {
    navigate(`/fbk/editservice/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8070/feedback/servicea/${id}`
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the feedback.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleCreateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Service Feedback Report", 14, 22);

    const columns = [
      { header: "Customer Name", dataKey: "UserName" },
      { header: "Email", dataKey: "Email" },
      { header: "Rating", dataKey: "Rating" },
      { header: "Feedback", dataKey: "Comment" },
    ];

    const rows = filteredFeedbacks.map((feedback) => ({
      UserName: feedback.UserName,
      Email: feedback.Email,
      Rating: feedback.Rating,
      Comment: feedback.Comment,
    }));

    doc.autoTable(columns, rows);
    doc.save("ServiceFeedbackReport.pdf");
  };

  const filterFeedbacks = (feedbacks, searchText) => {
    return feedbacks.filter((feedback) =>
      feedback.UserName.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  const handleAddFeedback = () => {
    navigate("/fbk/addservice");
  };

  const handleReceived = async (id) => {
    if (!hasBeenClicked(id)) {
      try {
        const feedbackToSend = filteredFeedbacks.find(
          (feedback) => feedback._id === id
        );

        // Check if the feedback has already been sent
        const sentFeedbackIds = JSON.parse(localStorage.getItem("sentFeedbackIds") || "[]");
        if (sentFeedbackIds.includes(id)) {
          Swal.fire({
            title: "Already Sent!",
            text: "This feedback has already been sent to the backend.",
            icon: "warning",
          });
          return;
        }

        const response = await axios.post(
          `http://localhost:8070/feedback/service/add`,
          feedbackToSend
        );
        if (response.status === 200) {
          setClickedFeedbacks([...clickedFeedbacks, id]);

          // Store the sent feedback ID in local storage
          const updatedSentFeedbackIds = [...sentFeedbackIds, id];
          localStorage.setItem("sentFeedbackIds", JSON.stringify(updatedSentFeedbackIds));

          Swal.fire({
            title: "Confirmed!",
            text: "Feedback received successfully.",
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

  const hasBeenClicked = (id) => {
    return clickedFeedbacks.includes(id);
  };

  const hasSentFeedback = (id) => {
    const sentFeedbackIds = JSON.parse(localStorage.getItem("sentFeedbackIds") || "[]");
    return sentFeedbackIds.includes(id);
  };

  return (
    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-4/5 rounded-[50px] py-12 px-12 gap -inset-y-8">
        <div className="w-full">
          <div
            className="text-4xl text-white font-bold align-top mb-6"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Service Feedback approval
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
          <div className="grid grid-cols-7 bg-cyan-400">
            <div className="border-2 border-black p-3">Name</div>
            <div className="border-2 border-black p-3">Email</div>
            <div className="border-2 border-black p-3">Rating</div>
            <div className="border-2 border-black p-3">Opinion</div>
            <div className="border-2 border-black p-3">Edit</div>
            <div className="border-2 border-black p-3">Delete</div>
            <div className="border-2 border-black p-3">Received</div>
          </div>
          <div
            className="w-full overflow-auto "
            style={{
              maxHeight: "450px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",}}
              >
                {filteredFeedbacks &&
                  filteredFeedbacks.map((feedback, index) => (
                    <div
                      className={`grid grid-cols-7 ${
                        index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
                      }`}
                      key={feedback._id}
                    >
                      <div className="border-2 border-black p-2">{feedback.UserName}</div>
                      <div className="border-2 border-black p-2">{feedback.Email}</div>
                      <div className="border-2 border-black p-2">{feedback.Rating}</div>
                      <div className="border-2 border-black p-2">{feedback.Comment}</div>
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
                      <div className="border-2 border-black p-2">
                        {hasBeenClicked(feedback._id) ? (
                          <button
                            className="bg-green-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                            disabled
                          >
                            Confirmed
                          </button>
                        ) : (
                          <button
                            className={`bg-blue-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold ${
                              hasSentFeedback(feedback._id) ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            onClick={() => handleReceived(feedback._id)}
                            disabled={hasSentFeedback(feedback._id)}
                          >
                            {hasSentFeedback(feedback._id) ? "Sent" : "Receive"}
                          </button>
                        )}
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
              <button
                className="absolute bottom-4 left-1/4 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-9 "
                onClick={handleAddFeedback}
              >
                Add Feedback
              </button>
              </div>
              </div>
              </div>
              );
              };
              
              export default ServiceFeedbackApproval;