import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const ServiceFeedbackTable = () => {
  let navigate = useNavigate();

  const {id} = useParams();

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8070/feedback/service");
        console.log(response);
        setFeedbacks(response.data.result);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleEdit = (id) => {
    navigate(`/fbk/editservice/${id}`);
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
          const response = await axios.delete(`http://localhost:8070/feedback/service/${id}`)

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

  return (
    <div className="w-full">
        <div className="title">Service Feedback list</div>
      <div className="grid grid-cols-8 bg-cyan-400">
        <div className="border-2 border-black p-3">Name</div>
        <div className="border-2 border-black p-3">Email</div>
        <div className="border-2 border-black p-3">Rating</div>
        <div className="border-2 border-black p-3">Opinion</div>
        <div className="border-2 border-black p-3">Edit</div>
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
        {feedbacks &&
          feedbacks.map((feedback, index) => (
            <div
              className={`grid grid-cols-8 ${
                index % 2 == 0 ? "bg-cyan-200 " : "bg-cyan-400 "
              }`}
              key={feedback._id}
            >
              <div className="border-2 border-black p-2">
                {feedback.UserName}
              </div>
              <div className="border-2 border-black p-2">{feedback.Email}</div>
              <div className="border-2 border-black p-2">{feedback.Rating}</div>
              <div className="border-2 border-black p-2">
                {feedback.Comment}
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
                  onClick={() =>
                    handleDelete(feedback._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServiceFeedbackTable;