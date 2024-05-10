import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import Swal from "sweetalert2";
import bg from "../../../Images/feedback.jpeg"

const Coachfeedback = () => {

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
      };

    const [UserName,setUserName] = useState('')
    const [Email,setEmail] = useState('')
    const [Coach,setCoach] = useState('')
    const [Rating,setRating] = useState(0)
    const [Comment,setComment] = useState('')
    const [error, setError] = useState(null)
    const [fetcherror, setFetchError] = useState(null)
    const [coaches, setCoaches] = useState([])

    {/*const navigate =useNavigate()*/}

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const CoachFeedback = {UserName, Email, Coach,Rating, Comment}

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

                        setUserName('')
                        setEmail('')
                        setRating('')
                        setComment('')
                        setCoach('')
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
        
                <div className="flex h-full justify-center items-center" style={bgStyle}>
                <div className="bg-black/45 w-1/2 h-2/3 rounded-[50px] py-12 px-14 gap -inset-y-8">
                    <div
                    className="text-4xl text-white font-bold align-top mb-8"
                    style={{ WebkitTextStroke: "1px black" }}
                    >
                    Give your feedback on Coach
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center"> 
                    
                            <label for="Name" className="text-white rounded-xl flex items-center pl-5 font-bold text-2xl"
                style={{ WebkitTextStroke: "1px black" }}>Full Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="name"
                                value={UserName}
                                onChange={(e)=>setUserName(e.target.value)}
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                required />
                        </div>
                        <div className="flex justify-between items-center">                            
                        <label for="Email" className="text-white flex items-center pl-5 font-bold text-2xl"
                style={{ WebkitTextStroke: "1px black" }}>Email Address:</label>
                            <input
                                type="Email"
                                id="Email"
                                name="Email"
                                value={Email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="w-3/5 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                                required />
                        </div>
                        <div className="flex justify-between items-center"> 
                        <label className="text-white flex items-center pl-5 font-bold text-2xl"
                           style={{ WebkitTextStroke: "1px black" }}>Select Your Coach : </label>
                        <select className="w-3/5 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                           onChange={(e) => setCoach(e.target.value)} value={Coach} required>
                            <option selected disabled >Select</option>
                            <option value="Dinith">Dinith</option>
                            <option value="Buddhina">Buddhina</option>
                            {/* {coaches && coaches.map((coach)=>(
                                <option key={coach.id}>{coach.coach_name}</option>
                            ))} */}
                        </select>
                        </div>
                        {/*Enter rating*/}
                        <div className="flex justify-between items-center">
                        <label className="text-white flex items-center pl-5 font-bold text-2xl"
                style={{ WebkitTextStroke: "1px black" }}>Rate Coaches service</label>
                        
  {Array(5)
    .fill()
    .map((_, index) =>
      Rating >= index + 1 ? (
        <AiFillStar
          key={index}
          style={{ color: 'orange', cursor: 'pointer' }}
          onClick={() => setRating(index + 1)}
          className="FillStar cursor-pointer"
          />
      ) : (
        <AiOutlineStar
          key={index}
          style={{ color: 'orange' }}
          onClick={() => setRating(index + 1)}
          className="OutlineStar cursor-pointer"
          />
      )
    )}
</div>

                        
                        <div className="w-6/7 bg-white/70 h-14 rounded-xl placeholder-text-black placeholder-font-semibold placeholder-text-lg pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500">
                        <textarea
                id="inquiry"
                name="inquiry"
                placeholder="Enter your opinion here"
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full max-w-full min-w-full"
              ></textarea>
                          <div className="flex justify-center mt-11">
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
                        </div>
                        
                        </div>
                    </form>
                    
                    </div>
                    </div>
    );

};

 
export default Coachfeedback;