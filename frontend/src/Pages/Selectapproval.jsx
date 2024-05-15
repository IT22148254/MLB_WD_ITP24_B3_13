import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import bg from "../Images/feedback.jpeg";

const Selectapproval = () => {

    const navigate = useNavigate();

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
      };

     {/*const navigate =useNavigate()*/}
    const handleCoachFeedback = () => {
        {/*navigate ('/promoPackages')*/}
    };
    
     const handleServiceFeedback = () => {
    //     //{/*navigate ('/promoPackages')*/}
     };

    return (  
        <div style={bgStyle}>
        <div className="flex h-full justify-center items-center ">
        <div className=" w-5/8 h-auto bg-black/25 rounded-[50px] py-12 px-14 flex flex-col gap-y-4">
        <p className="text-4xl text-white font-bold mb-8" style={{ WebkitTextStroke: '1px black' }}>Select the approval type</p> {/* Removed align-top and mb-0 */}

                
                {/* <button class="primary__btn" onClick={handleCoachFeedback}>Coach Feedback</button>
                <button class="primary__btn" id="servicebutton" onClick={handleServiceFeedback}>Service Feedback</button> */}
                
               
                        <div className="flex justify-between" >

                            <button className="mr-5 bg-blue-500 py-3 px-8 w-40 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300" onClick={ (e) =>navigate ("/fbk/coachfeedbackapprove")} >
                            Coach Feedback Approval
                            </button>
                            
                            <button className="ml-5 bg-blue-500 py-3 px-8 w-40 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300" onClick={ (e) =>navigate ("/fbk/servicefeedbackapprove")}>
                            <a><p id='ed'>Service Feedback Approval</p></a>
                            </button>

                        </div>
                
                </div>
                </div>
            </div>
           
    );
}
 
export default Selectapproval;



