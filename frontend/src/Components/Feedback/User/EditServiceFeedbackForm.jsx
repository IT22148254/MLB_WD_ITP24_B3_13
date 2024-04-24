import React, { useState,useEffect } from "react"
import axios from 'axios'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { useParams } from "react-router-dom"
import Swal from "sweetalert2";

const EditServiceFeedbackForm = () => {

    const { id } = useParams();
    const [UserName,setName] = useState('');
    const [Email,setEmail] = useState('');
    const [Rating,setRating] = useState(0);
    const [Comment,setComment] = useState('');
    const [error, setError] = useState(null)

    useEffect(() => {
        
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
            window.location.reload();
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
        <body class="bgimg">
        
        <section class="feedbacksection">
        
            <h1 class="title">Edit Your Feedback</h1>
            <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row">
                            <label for="Name" className="promo-lbl">Full Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="name"
                                className="promoInput"
                                value={UserName}
                                onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div className="add-promo-row">
                            <label for="Email" className="promo-lbl">Email Address:</label>
                            <input
                                type="Email"
                                id="Email"
                                name="Email"
                                value={Email}
                                onChange={(e)=>
                                    setEmail(e.target.value)
                                }
                                className="promoInput"/>
                        </div>
                        
                        {/*Enter rating*/}
                        <div>
                        <label class="servicerate">Rate Our service</label>
                        {Array(5).fill().map((_,index)=>
                        Rating >= index + 1 ?
                        (<AiFillStar style={{color:'orange'}} onClick={()=>setRating(index + 1)} class="FillStar" />
                        ):(<AiOutlineStar style={{color:'orange'}} onClick={()=>setRating(index + 1)} class="OutlineStar"/>))}
                        </div>
                        <div className="add-promo-row">
                            <textarea id="inquiry" name="inquiry" placeholder="Enter your opinion here" value={Comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                        <div class="add-promo-row">
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
        </section>
        
        
</body>
    );
}
 
export default EditServiceFeedbackForm;