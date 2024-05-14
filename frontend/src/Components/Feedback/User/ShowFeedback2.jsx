import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Container } from "reactstrap";
import bg from "../../../Images/feedback.jpeg";

const ShowFeedback2 = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };
  // Initialize the useNavigate hook
  let navigate = useNavigate();

  const { id } = useParams();

  const [feedbacks, setFeedbacks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/feedback/coach"
        );
        console.log(response);
        setFeedbacks(response.data.result);
        setFilteredFeedbacks(response.data.result);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    const filtered = filterFeedbacks(feedbacks, searchInput);
    setFilteredFeedbacks(filtered);
  }, [searchInput, feedbacks]);

  const handleEdit = (id) => {
    navigate(`/fbk/coachfeedbackedit/${id}`);
  };

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
            `http://localhost:8070/feedback/coach/${id}`
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
              text: "Failed to delete the feedback.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting feeddback:", error);
        }
      }
    });
  };

  const handleCreateReport = () => {
    // initialize the PDF document
    const doc = new jsPDF();

    // add title to the PDF document
    doc.setFontSize(16);
    doc.text("Coach Feedback Report", 14, 22);

    // define the table columns
    const columns = [
      { header: "Customer Name", dataKey: "UserName" },
      { header: "Email", dataKey: "Email" },
      { header: "Rating", dataKey: "Rating" },
      { header: "Feedback", dataKey: "Comment" },
      { header: "Coach", dataKey: "Coach" }, // Add the Coach column
    ];

    // define the table rows
    const rows = filteredFeedbacks.map((feedback) => ({
      UserName: feedback.UserName,
      Email: feedback.Email,
      Rating: feedback.Rating,
      Comment: feedback.Comment,
      Coach: feedback.Coach, // Add the Coach field
    }));

    // add the table to the PDF document
    doc.autoTable(columns, rows);

    // save the PDF file
    doc.save("CoachFeedbackReport.pdf");
  };

  const filterFeedbacks = (feedbacks, searchText) => {
    return feedbacks.filter((feedback) =>
      feedback.UserName.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };

  // Define the function to handle navigation to the add feedback page
  const handleAddFeedback = () => {
    navigate("/fbk/coachfeedback"); // Navigate to the add feedback page
  };

  return (
    <div className="flex flex-col items-center" style={bgStyle}>

      <div className="bg-black/45 w-[500px] rounded-[50px] py-12 px-12 gap -inset-y-8">
        <div className="w-[500px]">
          <div
            className="text-white text-4xl font-bold align-top mb-6"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Coach Feedback list
          </div>
          <div className="mb-4">
            {/* <div className="h-9 bg-white/70 w-1/2 rounded-lg">
              <input
                placeholder="Search by Name"
                className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div> */}
          </div>
          <div className="text-white">
            {filteredFeedbacks &&
              filteredFeedbacks.map((feedback, index) => (
                <div key={feedback._id} className="mb-4">
                  <div className="font-bold">Name: {feedback.UserName}</div>
                  <div>Email: {feedback.Email}</div>
                  <div>Rating: {feedback.Rating}</div>
                  <div>Feedback: {feedback.Comment}</div>
                  <div>Coach: {feedback.Coach}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedback2;
