import React from 'react';
import logo from '../Images/logo.png';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        {/* Logo */}
        <img src={logo} alt="Company Logo" className="w-20 h-auto mr-2" />
        <h1 className="text-4xl font-bold text-white ml-2">WAVESYNC</h1>

        {/* Navigation Links */}
        <nav className=" mx-auto flex m">
          <a href="#" className="hover:text-gray-400">
            About Us
          </a>
          <a href="#" className="hover:text-gray-400 mx-4">
            Shop
          </a>
          <a href="#" className="hover:text-gray-400">
            Packages
          </a>
        </nav>

        {/* User Authentication Buttons */}
        <div className="space-x-4">
          <button className='w-20'>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mr-5">
              Login
            </a>
          </button>
          <button className='w-20'>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded ml-3">
              Register
            </a>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
