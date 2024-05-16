import React from "react";
import { Container } from "reactstrap";
import bgImage from "../../Images/bg.jpg";
import TimeSlotImage from "..//../Images/bg123.jpg";

import buttonImage1 from "../../Images/sm.png";
import buttonImage2 from "../../Images/fm.png";
import buttonImage3 from "../../Images/ic.png";
import buttonImage4 from "../../Images/ppm.png";
import buttonImage5 from "../../Images/ssm.png";
import buttonImage6 from "../../Images/om.png";
import buttonImage7 from "../../Images/ed.png";
import buttonImage8 from "../../Images/spm.png";
import { useNavigate } from "react-router-dom";


const SceduleTimeSlot = () => {
  const navigate = useNavigate()
  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
      <div className="relative flex items-center justify-center w-2/3 h-full mx-auto">
        <img src={TimeSlotImage} alt="Time Slot" />
        <section>
  

  <div className="absolute top-0 bottom-[230px] right-0 flex items-center left-[640px]">
    <button className="flex flex-col items-center" onClick={()=>{navigate("/fbk/selApp")}} >
      <img src={buttonImage2} alt="button" className="h-[100px] w-[100px]" />
      <p className="absolute text-base  bottom-[242px] left-0 right-[650px] text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Feedback Management
      </p>
    </button>
  </div>

  <div className="absolute top-[480px] bottom-[1px] right-0 flex  left-[640px]">
    <button className="flex flex-col items-center" onClick={()=>{navigate("/sch/schedule")}} >
      <img src={buttonImage3} alt="button" className="h-[100px] w-[100px]" />
      <p className="absolute text-base  bottom-[300px] left-0 right-[700px] text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Schedule Management</p>
    </button>
  </div>

  <div className="absolute top-0 bottom-[570px] right-0 flex items-center left-[660px]">
    <button className="flex flex-col items-center " onClick={()=>{navigate("/store/admins")}}>
      <img src={buttonImage1} alt="button" className="h-[80px] w-[80px] " />
      <p className="absolute text-base  bottom-[80px] left-0 right-[650px] justify-center text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Sales Management
      </p>
    </button>
  </div>

  <div className="absolute top-[655px] bottom-[1px] right-0 flex  left-[640px]">
    <button className="flex flex-col items-center" onClick={()=>{navigate("/pkg/pkgDashboard")}}>
      <img src={buttonImage4} alt="button" className="h-[100px] w-[100px]" />
      <p className="absolute text-base  bottom-[120px] left-0 right-[550px] text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Package Management
      </p>
    </button>
  </div>

  <div className="absolute top-0 bottom-[230px] right-0 flex items-center left-[1000px]">
    <button className="flex flex-col items-center" onClick={()=>{navigate("/user/gmdashboard")}} >
      <img src={buttonImage6} alt="button" className="h-[100px] w-[100px]" />
      <p className="absolute text-base  bottom-[242px] left-0 right-[650px] text-white font-normal" style={{ fontFamily: 'poppins' }}>
        General Manager
      </p>
    </button>
  </div>

  <div className="absolute top-0 bottom-[570px] right-0 flex items-center left-[1000px]">
    <button className="flex flex-col items-center " onClick={()=>{navigate("/sup/supDashboard")}} >
      <img src={buttonImage5} alt="button" className="h-[100px] w-[100px] " />
      <p className="absolute text-base  bottom-[80px] left-0 right-[650px] justify-center text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Supply Manager
      </p>
    </button>
  </div>

  <div className="absolute top-[480px] bottom-[1px] right-0 flex  left-[1000px]">
    <button className="flex flex-col items-center" onClick={()=>{navigate("/emp/")}} >
      <img src={buttonImage7} alt="button" className="h-[100px] w-[100px]" />
      <p className="absolute text-base  bottom-[300px] left-0 right-[700px] text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Employee Management</p>
    </button>
  </div>

  <div className="absolute top-[655px] bottom-[1px] right-0 flex  left-[1000px]">
    <button className="flex flex-col items-center" onClick={()=>{navigate("/payment/all")}} >
      <img src={buttonImage8} alt="button" className="h-[100px] w-[100px]" />
      <p className="absolute text-base  bottom-[120px] left-0 right-[550px] text-white font-normal" style={{ fontFamily: 'poppins' }}>
        Payement Management
      </p>
    </button>
  </div>
  <div>
    <button className="bg-yellow-400 hover:bg-yellow-600 w-auto h-auto" onClick={()=>{navigate("/emp/addleave")}}>Apply for leave</button>
  </div>
</section>
        
      </div>
    </div>
  );
};

export default SceduleTimeSlot;
