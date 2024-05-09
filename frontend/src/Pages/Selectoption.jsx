import { useNavigate } from 'react-router-dom'
import bg from "../Images/feedback.jpeg";

const Selectoption = () => {

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
        {/*navigate ('/promoPackages')*/}
    };

    return (  
        <div style={bgStyle}>
        <div className="flex h-full justify-center items-center ">
        <div className="bg-black/45 w-5/8 h-auto rounded-[50px] py-12 px-14 flex flex-col gap-y-4">
        <p className="text-4xl text-white font-bold mb-8" style={{ WebkitTextStroke: '1px black' }}>Select the option you wish to proceed</p> {/* Removed align-top and mb-0 */}

                
                {/* <button class="primary__btn" onClick={handleCoachFeedback}>Coach Feedback</button>
                <button class="primary__btn" id="servicebutton" onClick={handleServiceFeedback}>Service Feedback</button> */}
                
               
                        <div className="flex justify-between" >
                            <button className="mr-5 bg-blue-500 py-3 px-8 w-40 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300"  >
                            Coach Feedback
                            </button>
                            <button className="ml-5 bg-blue-500 py-3 px-8 w-40 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300" >
                            <a><p id='ed'>Service Feedback</p></a>
                            </button>
                        </div>
                    
                
                
                </div>
                </div>
            </div>
           
    );
}
 
export default Selectoption;



