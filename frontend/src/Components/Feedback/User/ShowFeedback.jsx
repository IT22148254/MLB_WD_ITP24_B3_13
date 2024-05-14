import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
    color: "white", // Set text color to white
  };

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

  const filterFeedbacks = (feedbacks, searchText) => {
    return feedbacks.filter((feedback) =>
      feedback.UserName.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  const handleAddFeedback = () => {
    navigate("/fbk/addservice");
  };

  return (
    <div className="flex flex-col items-center" style={bgStyle}>
      <h1 className="text-4xl font-bold mt-6 mb-8">Service Feedback</h1> {/* Added header with white text */}
      <div className="bg-black/45 w-[500px] rounded-[50px] py-12 px-12 gap -inset-y-8">
        <div className="w-[500px]">
          <input
            type="text"
            placeholder="Search by Name"
            className="w-full h-10 px-4 rounded-lg bg-white bg-opacity-70 mb-4 text-black" // Changed input text color to black
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback._id} className="mb-4">
              <div className="font-bold">Name: {feedback.UserName}</div>
              <div>Email: {feedback.Email}</div>
              <div>Rating: {feedback.Rating}</div>
              <div>Feedback: {feedback.Comment}</div>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold mt-6 hover:bg-blue-700 transition duration-300"
            onClick={handleAddFeedback}
          >
            Add Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedback;
