import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import bg from "../../../Images/feedback.jpeg";
import { useNavigate } from "react-router-dom";

const EditServiceFeedbackForm = () => {
  const { id } = useParams();
  const [UserName, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Rating, setRating] = useState(0);
  const [Comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(UserName + " " + Email + " " + Rating + " " + Comment);
    const fetchServiceFeedback = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/feedback/service/get/${id}`
        );
        const feedback = response.data.ServiceFeedBack;
        setName(feedback.UserName);
        setEmail(feedback.Email);
        setRating(feedback.Rating);
        setComment(feedback.Comment);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching instructor feedback:", error);
      }
    };
    fetchServiceFeedback();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      UserName,
      Email,
      Rating,
      Comment,
    }); // Log the form data
    axios
      .put(`http://localhost:8070/feedback/service/${id}`, {
        UserName,
        Email,
        Rating,
        Comment,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success",
          text: "Feedback updated successfully",
          icon: "success",
        }).then(() => {
          console.log("feedback updated", res.data);
          setError(null);
        });
        //window.location = "http://localhost:3000/InstructorProfile";
        //window.location.reload();
        console.log("Successfully updated list");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Cannot update the feedback",
          icon: "error",
        }).then(() => {
          console.log("Cannot update the feedback", error);
        });
        window.location.reload();
      });
    navigate("/fbk/servicetable");
  };

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };

  return (
    /*<body className="bgimg">*/

    // <section className="bg-gray-100 min-h-screen">

    <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
        <div
          className="text-4xl text-white font-bold align-top mb-8"
          style={{ WebkitTextStroke: "1px black" }}
        >
          <h1 className="title">Edit Your Feedback</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="Name"
                className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Full Name:
              </label>
              <input
                type="text"
                id="Name"
                name="name"
                value={UserName}
                onChange={(e) => setName(e.target.value)}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg 
                                pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="Email"
                className="text-white flex items-center pl-5 font-bold text-2xl"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Email Address:
              </label>
              <input
                type="Email"
                id="Email"
                name="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg 
                                pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                required
              />
            </div>

            {/*Enter rating*/}
            <div className="flex justify-between items-center">
              <label
                htmlFor="rating"
                className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Rate Our service:
              </label>
              {Array(5)
                .fill()
                .map((_, index) =>
                  Rating >= index + 1 ? (
                    <AiFillStar
                      key={index}
                      style={{ color: "orange" }}
                      onClick={() => setRating(index + 1)}
                      className="FillStar cursor-pointer"
                    />
                  ) : (
                    <AiOutlineStar
                      key={index}
                      style={{ color: "orange" }}
                      onClick={() => setRating(index + 1)}
                      className="OutlineStar cursor-pointer"
                    />
                  )
                )}
            </div>
            <div
              className="w-6/7 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg 
                        pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
            >
              <textarea
                id="inquiry"
                name="inquiry"
                placeholder="Enter your opinion here"
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full max-w-full min-w-full"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="reset"
                className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mr-20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
      <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300 mb-16">
        Edit Feedbacks
      </button>
    </div>

    // </section>

    /*</body>*/
  );
};

export default EditServiceFeedbackForm;
