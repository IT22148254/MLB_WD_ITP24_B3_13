import React from 'react';
import bg from '../Images/Homebg.jpg'

const WavesyncHome = () => {

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
};


  return (
    // <div className="bg-blue-900 py-20 px-8 relative overflow-hidden">
    <div className="flex h-full justify-center items-center relative" style={bgStyle}>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-full h-full bg-gradient-to-t from-blue-900 to-transparent"></div>
        <div className="w-full h-full bg-gradient-to-b from-blue-900 to-transparent"></div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center z-10">
      <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">WAVESYNC</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        JOIN With Us
      </button>
    </div>
  </div>
  
  );
};

export default WavesyncHome;