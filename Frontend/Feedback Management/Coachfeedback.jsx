import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'

const Coachfeedback = () => {

    const [feedbackID,setfeedbackId] = useState('')
    const [custName,setCustName] = useState('')
    const [custEmail,setCustEmail] = useState('')
    const [coachName,setcoachName] = useState('')
    const [coachRating,setcoachRating] = useState(0)
    const [coachFeedback,setcoachFeedback] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const CoachFeedback = {feedbackID, custName, custEmail, coachName,coachRating, coachFeedback, error}

        const response = await fetch('/api/prPackages', {
            method: 'POST',
            body: JSON.stringify(CoachFeedback),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setfeedbackID('')
            setCustName('')
            setCustEmail('')
            setcoachRating('')
            setcoachFeedback('')
            setError(null)
            console.log('new feedback added', json)
            alert('New feedback added successfully!')
            navigate('')
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
                                value={custName}
                                onChange={(e)=>{setCustName(e.target.value)}}
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Email" className="promo-lbl">Email Address:</label>
                            <input
                                type="Email"
                                id="Email"
                                name="Email"
                                value={custEmail}
                                onChange={(e)=>setCustEmail(e.target.value)}
                                className="promoInput"
                                required />
                        </div>
                        <div>
                        <label class="ftIns">Select Your Fitness Instructor</label>
                        <select class="insSelect" onChange={(e) => setcoachName(e.target.value)} value={coachName} required>
                            <option>Select</option>
                            <option>Mr. Leanne Graham</option>
                            <option>Mr. Ervin Howell</option>
                            <option>Mr. Kurtis Weissnat</option>
                            <option>Mr. Nicholas Runolfsdottir V</option>
                            <option>Mr. Glenna Reichert</option>
                            
                        </select>
                        </div>
                        {/*Enter rating*/}
                        <div>
                        <label class="servicerate">Rate Coaches service</label>
                        {Array(5).fill().map((_,index)=>
                        rating >= index + 1 ?
                        (<AiFillStar style={{color:'orange'}} onClick={()=>setRating(index + 1)} class="FillStar" />
                        ):(<AiOutlineStar style={{color:'orange'}} onClick={()=>setRating(index + 1)} class="OutlineStar"/>))}
                        </div>
                        <div className="add-promo-row">
                            <textarea id="inquiry" name="inquiry" placeholder="Enter your opinion here" value={coachFeedback}></textarea>
                        <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Create</button>
                                        </div>
                                    </div>
                                    {/*error - this is for me*/}
                                </div>
                        </div>
                    </form>
                </Container>
            </section>
        </body>
     );
}
 
export default Coachfeedback;