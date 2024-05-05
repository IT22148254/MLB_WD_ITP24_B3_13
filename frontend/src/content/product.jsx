import { Link } from "react-router-dom";
import Rating from "./rating";
import React from "react";

function product({ product }) {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
      <div className="max-w-sm rounded-3xl transform transition-transform duration-800 hover:scale-105 overflow-hidden shadow-lg bg-slate-100">
        <img className="object-cover object-center w-96 h-96 " src={product.image} alt={product.name}  />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <div className="font-bold text-xl mb-2">LKR : {product.price.toFixed(2)}</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
      </div>
    </Link>
  );
}

export default product;
