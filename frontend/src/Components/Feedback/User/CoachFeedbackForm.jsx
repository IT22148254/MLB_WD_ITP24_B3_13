import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import Swal from "sweetalert2";

const Coachfeedback = () => {

    const [UserName,setCustName] = useState('')
    const [Email,setCustEmail] = useState('')
    const [coach,setcoachName] = useState('')
    const [rating,setcoachRating] = useState(0)
    const [comment,setcoachFeedback] = useState('')
    const [error, setError] = useState(null)
    const [fetcherror, setFetchError] = useState(null)
    const [coaches, setCoaches] = useState([])

    {/*const navigate =useNavigate()*/}

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const CoachFeedback = {custName, custEmail, coachName,coachRating, coachFeedback}

                const response = await fetch('localhost:8070/feedback/coach/add', {
                    method: 'POST',
                    body: JSON.stringify(CoachFeedback),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()
        
                if (!response.ok) {
                    setError(json.error)
                    console.log('error', error)
                }
        
                if (response.ok) {

                        setCustName('')
                        setCustEmail('')
                        setcoachRating('')
                        setcoachFeedback('')
                        setcoachName('')
                        setError(null)
                        window.reload()
                    
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

    // useEffect(()=>{

    //     const fetchCoaches = async ()=>{

    //         const response = await fetch('http://localhost:8000/coaches')
    //         const json = await response.json()
    //         if(response.ok){
    //             setCoaches(json)
    //         }
    
    //         else{
    //             setFetchError(json.error)
    //             console.log('fetcherror', fetcherror)
    //         }     
    
    //     }

    //     fetchCoaches()

    // },[])

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
                                onChange={(e)=>setCustName(e.target.value)}
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
                        <label class="ftIns">Select Your Coach</label>
                        <select class="insSelect" onChange={(e) => setcoachName(e.target.value)} value={coachName} required>
                            <option selected disabled >Select</option>
                            <option value="Dinith">Dinith</option>
                            <option value="Buddhina">Buddhina</option>
                            {/* {coaches && coaches.map((coach)=>(
                                <option key={coach.id}>{coach.coach_name}</option>
                            ))} */}
                        </select>
                        </div>
                        {/*Enter rating*/}
                        <div>
                        <label class="servicerate">Rate Coaches service</label>
                        <div style={{ display: 'inline-block' }}>
  {Array(5)
    .fill()
    .map((_, index) =>
      coachRating >= index + 1 ? (
        <AiFillStar
          key={index}
          style={{ color: 'orange', cursor: 'pointer' }}
          onClick={() => setcoachRating(index + 1)}
          className="FillStar"
        />
      ) : (
        <AiOutlineStar
          key={index}
          style={{ color: 'orange', cursor: 'pointer' }}
          onClick={() => setcoachRating(index + 1)}
          className="OutlineStar"
        />
      )
    )}
</div>

                        </div>
                        <div className="add-promo-row">
                            <textarea id="inquiry" name="inquiry" placeholder="Enter your opinion here" value={coachFeedback} onChange={(e)=>setcoachFeedback
                            (e.target.value)}></textarea>
                        <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Create</button>
                                        </div>
                                    </div>
                                    {error && <div>{error}</div>}
                                </div>
                        </div>
                    </form>
                </Container>
            </section>
        </body>
     );
}

 
export default Coachfeedback;