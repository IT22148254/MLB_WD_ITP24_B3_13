import React, { useState } from "react";
import logo from "../Images/logo.png";
import { Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutCall] = useLogoutMutation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility

  const logoutHandler = async (e) => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header class="bg-gradient-to-r from-[#00293b] via-[#00296b] to-[#00293b] py-12 sm:px-16 max-sm:px-8 font-sans tracking-wide">
        <div className="container mx-auto flex justify-center items-center">
          {/* Logo */}
          <img src={logo} alt="Company Logo" className="w-20 h-auto mr-2" />
          <h1 className="text-4xl font-bold text-white ml-2">WAVESYNC</h1>

          {/* Navigation Links */}
          <nav className=" mx-auto flex m">
            <a href="/fbk/abtUs" className="text-white hover:text-gray-400">
              Feedback
            </a>
            <a href="/store" className="text-white hover:text-gray-400 mx-4">
              Shop
            </a>
            <a href="/pkg/showpromo" className="text-white hover:text-gray-400">
              Packages
            </a>
          </nav>

          {/* User Authentication Buttons */}
          <div className="space-x-4">
            <button
              className="text-white focus:outline-none md:hidden"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
            >
              <FaShoppingCart />
            </button>
            {userInfo ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
                >
                  <FaUser />
                  <span>{userInfo.Fname}</span>
                </button>
                {isDropdownOpen && ( // Conditionally render dropdown menu based on state
                  <ul className="absolute top-full left-0 bg-gray-800 text-white rounded mt-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block py-2 px-4 hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logoutHandler}
                        className="block py-2 px-4 w-full text-left hover:bg-gray-700"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <FaUser />
                <span>Log In</span>
              </Link>
            )}
            <Link to="/cart" className="flex items-center space-x-2">
              <FaShoppingCart />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <Badge pill bg="success">
                  {cartItems.reduce((acc, c) => (acc += c.quantity), 0)}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
