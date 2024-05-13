import React from 'react';
import bg from '../Images/Homebg.jpg';

const WavesyncHome = () => {
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  };

  const fontStyle = {
    fontFamily: "'Just Me Again Down Here', cursive",
    fontWeight: 400,
    fontStyle: "normal",
  };

  return (
    <div className="flex h-full justify-center items-center relative" style={bgStyle}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-full h-full bg-gradient-to-t from-blue-900 to-transparent"></div>
          <div className="w-full h-full bg-gradient-to-b from-blue-900 to-transparent"></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center z-10">
        <h1 className=" font-bold text-[200px] text-white mb-4" style={fontStyle}>
          WAVESYNC
        </h1>

       
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> */}
        
        
        <button className="bg-blue-200 hover:bg-blue-700 text-black font-semibold py-3 px-6 rounded-full uppercase shadow-md transition duration-500 ease-in-out transform hover:scale-110 ring-2 ring-blue-400 ring-opacity-50 ">
            JOIN With Us    
        </button>


      </div>
    </div>
  );
};

export default WavesyncHome;