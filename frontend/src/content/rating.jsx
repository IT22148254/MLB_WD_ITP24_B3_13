import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center space-x-1">
      <span>
        {value >= 1 ? (
          <FaStar className="text-yellow-500" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-300" />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar className="text-yellow-500" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-300" />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar className="text-yellow-500" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-300" />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar className="text-yellow-500" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-300" />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar className="text-yellow-500" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="text-yellow-500" />
        ) : (
          <FaRegStar className="text-gray-300" />
        )}
      </span>
      <span className="ml-2 text-gray-600"> {text && text}</span>
    </div>
  );
};

export default Rating;
