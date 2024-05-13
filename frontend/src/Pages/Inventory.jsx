import React from "react";
import Itemtable from "../components/Supply/Itemtable"
import bg from "../Images/bg_main.jpg";;
const Inventory = () => {

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
      };
    return (
        <section>
          <div style={bgStyle}>
            <div className="flex flex-col justify-center items-center h-screen">
              <div className="bg-black/45 w-1/2 h-auto rounded-[50px] py-12 px-14 gap -inset-y-8">
                <div className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Inventory</div>
                <Itemtable/>
              </div>
            </div>
          </div>
        </section>
      );

        
       
        
    
}
 
export default Inventory;