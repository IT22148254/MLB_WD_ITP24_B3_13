import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useParams } from "react-router-dom";
import bg from "../../../Images/feedback.jpeg";

const ShowFeedback = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
  };

  let navigate = useNavigate();
  const { id } = useParams();

  const [serviceFeedbacks, setServiceFeedbacks] = useState([]);
  const [coachFeedbacks, setCoachFeedbacks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const responseCoach = await axios.get("http://localhost:8070/feedback/coach");
        const responseService = await axios.get("http://localhost:8070/feedback/service");
        setServiceFeedbacks(responseService.data.result);
        setCoachFeedbacks(responseCoach.data.result);
        setFilteredFeedbacks([...responseService.data.result, ...responseCoach.data.result]);
      } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const filtered = filterFeedbacks(filteredFeedbacks, searchInput);
    setFilteredFeedbacks(filtered);
  }, [searchInput, filteredFeedbacks]);

  const handleAddsFeedback = () => {
    navigate("/fbk/addservice");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Feedback Report", 14, 22);

    const columns = [
      { header: "Customer Name", dataKey: "UserName" },
      { header: "Email", dataKey: "Email" },
      { header: "Rating", dataKey: "Rating" },
      { header: "Feedback", dataKey: "Comment" },
      { header: "Coach", dataKey: "Coach" },
    ];

    const rows = filteredFeedbacks.map((feedback) => ({
      UserName: feedback.UserName,
      Email: feedback.Email,
      Rating: feedback.Rating,
      Comment: feedback.Comment,
      Coach: feedback.Coach,
    }));

    doc.autoTable(columns, rows);

    doc.save("FeedbackReport.pdf");
  };

  const filterFeedbacks = (feedbacks, searchText) => {
    return feedbacks.filter((feedback) =>
      feedback.UserName.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  const handleAddFeedback = () => {
    navigate("/fbk/coachfeedback");
  };

  return (
    <div className="flex flex-col items-center" style={bgStyle}>
      <div className="bg-black/70 w-3/4 rounded-[50px] py-12 px-12 gap -inset-y-8">
        <div className="w-full flex">
          <div className="text-blue-200 w-1/2 mr-4">
            <h2 className="text-xl font-bold mb-2">Services Feedback</h2>
            {serviceFeedbacks.map((feedback, index) => (
              <div key={feedback._id} className="mb-4 feedback-item">
                <div className="font-bold">Name: {feedback.UserName}</div>
                <div>Email: {feedback.Email}</div>
                <div>Rating: {feedback.Rating}</div>
                <div>Feedback: {feedback.Comment}</div>
              </div>
            ))}
          </div>
          <div className="border-l border-gray-400 h-full" />
          <div className="text-blue-400 w-1/2 ml-4">
            <h2 className="text-xl font-bold mb-2">Coach Feedback</h2>
            {coachFeedbacks.map((feedback, index) => (
              <div key={feedback._id} className="mb-4 feedback-item">
                <div className="font-bold">Name: {feedback.UserName}</div>
                <div>Email: {feedback.Email}</div>
                <div>Rating: {feedback.Rating}</div>
                <div>Feedback: {feedback.Comment}</div>
                <div>Coach: {feedback.Coach}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-around items-center mt-8">
          <button
            className="bg-blue-300 text-black px-8 py-3 rounded-lg font-bold hover:bg-blue-700 hover:text-white hover:scale-105 transition duration-300"
            onClick={handleAddFeedback}
          >
            Add Coach Feedback
          </button>
          <button
            className="bg-blue-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-blue-700 hover:text-white hover:scale-105 transition duration-300"
            onClick={handleAddsFeedback}
          >
            Add Service Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedback;
