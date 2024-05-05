import { Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import React, { useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
    <header>
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/store" className="text-lg font-semibold">
            Online Store
          </Link>
          <button
            className="text-white focus:outline-none md:hidden"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown visibility
          >
            <FaShoppingCart />
          </button>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="flex items-center space-x-2"
            >
              <FaShoppingCart />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <Badge pill bg="success">
                  {cartItems.reduce((acc, c) => (acc += c.quantity), 0)}
                </Badge>
              )}
            </Link>
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
                      <Link to="/profile" className="block py-2 px-4 hover:bg-gray-700">
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
