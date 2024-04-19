import React, { useState,useEffect } from "react"
import axios from 'axios'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { useParams } from "react-router-dom"
import Swal from "sweetalert2";

const EditCoachFeedback = () => {

    const { id } = useParams();
    const [custName,setCustName] = useState('');
    const [custEmail,setCustEmail] = useState('');
    const [coachName,setCoachName] = useState('');
    const [coachRating,setCoachRating] = useState(0);
    const [coachfeedback,setCoachFeedback] = useState('');

    useEffect(() => {
        
        const fetchCoachFeedback = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/coachFeedbacks/${id}`);
                const feedback = response.data;
                setCustName(feedback.custName);
                setCustEmail(feedback.custEmail);
                setCoachName(feedback.coachName);
                setCoachRating(feedback.coachRating);
                setCoachFeedback(feedback.coachfeedback);
                console.log(response.data);
            } catch (error) {
                console.log('Error fetching instructor feedback:', error);
            }
        };
        fetchCoachFeedback();
      }, [id]);

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
          custName,
          custEmail,
          coachName,
          coachRating,
          coachfeedback,
        }); // Log the form data
      axios.patch(`http://localhost:8000/coachFeedbacks/${id}`, {
            custName: custName,
            custEmail: custEmail,
            coachName: coachName,
            coachRating: coachRating,
            coachfeedback: coachfeedback,
          })
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: "Success",
              text: "Feedback updated successfully",
              icon: "success",
            }).then(()=>{
              console.log('feedback updated', res.data)
            })
            //window.location = "http://localhost:3000/InstructorProfile";
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
            <form onSubmit={handleSubmit}>
            
            <div class = "Instructorfeedbackcontainer">
            
            <div>
                    <label class="rate">Give your new rating</label>
                    {Array(5).fill().map((_,index)=>
                    coachRating >= index + 1 ?
                    (<AiFillStar style={{color:'orange'}} onClick={()=>setCoachRating(index + 1)} value={coachRating} class="FillStar"/>
                    ):(<AiOutlineStar style={{color:'orange'}} onClick={()=>setCoachRating(index + 1)} class="OutlineStar"/>))}
                </div>
            <textarea cols="30" rows="5" placeholder="Enter your opinions here.." class="feedbacktext" name="instructorfeedback" onChange={(e) => setCoachFeedback(e.target.value)} value={coachfeedback}></textarea>
            <button class="primary__btn" id="button_style_ins" type="submit">Submit</button>
            <button class="primary__btn" id="button_style_ins" type="reset">Cancel</button>
            </div>
            </form>
        

        </section>
        
        
</body>
    );
}
 
export default EditCoachFeedback;