import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import Swal from "sweetalert2";

const ServiceFeedbackForm = () => {

    const [UserName,setName] = useState('');
    const [Email,setEmail] = useState('');
    const [Rating,setRating] = useState(0);
    const [Comment,setComment] = useState('');
    const [error, setError] = useState(null)
     {/*const navigate =useNavigate()*/}

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const ServiceFeedback = {UserName, Email, Rating, Comment}

        const response = await fetch('http://localhost:8070/feedback/service/add', {
            method: 'POST',
            body: JSON.stringify(ServiceFeedback),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {

            setError(json.error)
            Swal.fire({
                title: "Error",
                text: "Cannot add the feedback",
                icon: "Error",
              }).then(()=>{
                console.log('Cannot add the feedback', error)
              })
            
        }

        if (response.ok) {
            setName('')
            setEmail('')
            setRating('')
            setComment('')
            setError(null)
            Swal.fire({
                title: "Success",
                text: "Feedback added successfully",
                icon: "success",
              }).then(()=>{
                console.log('new feedback added', json)
              })

             {/*navigate ('/promoPackages')*/}
        }
    }

    return ( 
        <body>
            <section>
                <Container>
                    <div className="title">Give your feedback</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row">
                            <label for="Name" className="promo-lbl">Full Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="name"
                                className="promoInput"
                                value={UserName}
                                onChange={(e)=>setName(e.target.value)}
                                required />
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
                                className="promoInput"
                                required />
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
                    <button>View Feedbacks</button>
                </Container>
            </section>
        </body>
     );
}
 
export default ServiceFeedbackForm;