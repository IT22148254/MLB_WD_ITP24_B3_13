import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  };

  let navigate = useNavigate();
  const { id } = useParams();

  const [feedbacks, setFeedbacks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/feedback/service"
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
    <div className="relative" style={bgStyle}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      <div className="relative z-10 text-white text-center">
        <h1 className="text-4xl font-bold mb-6">Service Feedback List</h1>
        <input
          type="text"
          placeholder="Search by Name"
          className="w-full h-10 px-4 rounded-lg bg-white bg-opacity-70 mb-4"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4">
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback._id}>
              <div className="mb-4">
                <div className="text-lg font-bold mb-2">
                  Name: {feedback.UserName}
                </div>
                <div className="text-lg mb-2">Email: {feedback.Email}</div>
                <div className="text-lg mb-2">
                  Rating: {feedback.Rating}
                </div>
                <div className="text-lg mb-2">
                  Feedback: {feedback.Comment}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold mt-6 hover:bg-blue-700 transition duration-300"
          onClick={handleAddFeedback}
        >
          Add Feedback
        </button>
      </div>
    </div>
  );
};

export default ShowFeedback;
