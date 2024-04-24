import React, { useState,useEffect } from "react"
import axios from 'axios'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { useParams } from "react-router-dom"
import Swal from "sweetalert2";
import bg from "../../../Images/feedback.jpeg"

const EditServiceFeedbackForm = () => {

    const { id } = useParams();
    const [UserName,setName] = useState('');
    const [Email,setEmail] = useState('');
    const [Rating,setRating] = useState(0);
    const [Comment,setComment] = useState('');
    const [error, setError] = useState(null)

    useEffect(() => {
        
      console.log(UserName + " " + Email + " "+ Rating + " " + Comment );
        const fetchServiceFeedback = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/feedback/service/get/${id}`);
                const feedback = response.data.ServiceFeedBack;
                setName(feedback.UserName);
                setEmail(feedback.Email);
                setRating(feedback.Rating);
                setComment(feedback.Comment);
                console.log(response.data);
            } catch (error) {
                console.log('Error fetching instructor feedback:', error);
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
      axios.put(`http://localhost:8070/feedback/service/${id}`, {
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
            }).then(()=>{
              console.log('feedback updated', res.data)
              setError(null)
            })
            //window.location = "http://localhost:3000/InstructorProfile";
            //window.location.reload();
            console.log("Successfully updated list");
          })
          .catch((error) => {

            Swal.fire({
              title: "Error",
              text: "Cannot update the feedback",
              icon: "error",
            }).then(()=>{
              console.log('Cannot update the feedback', error)
            })
            window.location.reload();
          });
      }

    return (  
        <body className="bgimg">
        
        <section className="bg-gray-100 min-h-screen">
        
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
          <div className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }}>
            <h1 className="title">Edit Your Feedback</h1>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="Name" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>
                    Full Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="name"
                                value={UserName}
                                onChange={(e) => setName(e.target.value)}
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg 
                                pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                required />
                        </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="Email" className="text-white flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>
                    Email Address:</label>
                            <input
                                type="Email"
                                id="Email"
                                name="Email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg 
                                pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                required/>
                        </div>
                        
                        {/*Enter rating*/}
                        <div  className="flex justify-between items-center">
                        <label htmlFor="rating" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl" style={{ WebkitTextStroke: '1px black' }}>
                    Rate Our service:
                    </label>
                    {Array(5).fill().map((_, index) => 
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
                        <div className="add-promo-row">
                            <textarea id="inquiry" name="inquiry" placeholder="Enter your opinion here" value={Comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                        <div className="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Submit</button>
                                        </div>
                                    </div>
                                    {/*error - this is for me*/}
                                    {error && <div className="error">{error}</div>}
                                </div>
                        </div>
                    </form>
                    <button>Add new feedback</button>

                    </div>
                    </div>
        </section>
        
        
</body>
    );
}
 
export default EditServiceFeedbackForm;