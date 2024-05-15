import React from "react";
import { Container } from "reactstrap";
import bgImage from "../../Images/bg.jpg";
import TimeSlotImage from "..//../Images/bg123.jpg";

import buttonImage1 from "../../Images/ed.png";
import buttonImage2 from "../../Images/el.png";
import buttonImage3 from "../../Images/ic.png";
import buttonImage4 from "../../Images/pr.png";


const SceduleTimeSlot = () => {
  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
      <div className="relative flex items-center justify-center w-2/3 h-full mx-auto">
        <img src={TimeSlotImage} alt="Time Slot" />
        <section>
  <div className="absolute top-0 bottom-[400px] right-0 flex items-center left-[650px]">
    <button className="flex flex-col items-center">
      <img src={buttonImage1} alt="button" className="h-[200px] w-[200px]" />
      <p className="absolute text-xl bottom-[120px] left-0 right-[450px] text-center text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Employee Details
      </p>
    </button>
  </div>

  <div className="absolute top-0 bottom-[400px] right-0 flex items-center left-[1000px]">
    <button className="flex flex-col items-center">
      <img src={buttonImage2} alt="button" className="h-[200px] w-[200px]" />
      <p className="absolute text-xl bottom-[122px] left-0 right-[25px] text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Employee Leave Request
      </p>
    </button>
  </div>

  <div className="absolute top-[650px] bottom-[380px] right-0 flex items-center left-[650px]">
    <button className="flex flex-col items-center">
      <img src={buttonImage3} alt="button" className="h-[200px] w-[200px]" />
      <p className="absolute text-xl top-[110px] bottom-0 left-0 right-[450px] text-center text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Instructor Change Request
      </p>
    </button>
  </div>

  <div className="absolute top-[650px] bottom-[380px] right-0 flex items-center left-[1000px]">
    <button className="flex flex-col items-center">
      <img src={buttonImage4} alt="button" className="h-[200px] w-[200px]" />
      <p className="absolute text-xl bottom-0 top-[110px] left-0 right-[120px] text-center text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Promo Package Request
      </p>
    </button>
  </div>
</section>
        
      </div>
    </div>
  );
};

export default SceduleTimeSlot;
