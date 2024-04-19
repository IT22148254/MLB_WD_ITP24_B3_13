import { useNavigate } from 'react-router-dom'
const Selectoption = () => {

     {/*const navigate =useNavigate()*/}
    const handleCoachFeedback = () => {
        {/*navigate ('/promoPackages')*/}
    };
    const handleServiceFeedback = () => {
        {/*navigate ('/promoPackages')*/}
    };

    return (  
        <body>
        
            <section class="optionssec">
            <h1 class="title">Select the option you wish to proceed</h1>
            <div class="Optionscontainer">
                
                <button class="primary__btn" onClick={handleCoachFeedback}>Fitness Instructor Feedback</button>
                <button class="primary__btn" id="servicebutton" onClick={handleServiceFeedback}>Service Feedback</button>
                
            </div>
            </section>
            </body>
    );
}
 
export default Selectoption;