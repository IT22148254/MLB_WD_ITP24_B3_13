import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../content/rating";
import { useGetOneProductQuery } from "../slices/productsApiSlice";
import Loader from "../content/Loader";
import Message from "../content/Message";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetOneProductQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: qty }));
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link className="btn btn-light my-3" to="/store">
        Go back
      </Link>

      {isLoading ? (
        <div className="flex justify-center mt-20">
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="danger">{isError.error}</Message>
      ) : (
        <div className="flex flex-wrap">
          <div className="md:w-1/3 sm:w-full px-4">
            <div className="border border-gray-200 p-4 rounded">
              <ul className="list-none">
                <li>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                </li>
                <li>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </li>
                <li>Price: LKR {product.price}</li>
                <li>Description: {product.description}</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/3 sm:w-full px-4">
            <div className="max-w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/3 sm:w-full px-4">
            <div className="border border-gray-200 p-4 rounded">
              <ul className="list-none">
                <li>
                  <span className="font-semibold">Price:</span>{" "}
                  <span>LKR {product.price}</span>
                </li>
                <li>
                  <span className="font-semibold">Status:</span>{" "}
                  <span>{product.countInStock > 0 ? "In stock" : "Out of stock"}</span>
                </li>
                {product.countInStock > 0 && (
                  <li>
                    <label className="block mb-2">Quantity:</label>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="block w-full border border-gray-300 rounded p-2"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                )}
                <li>
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className={`btn mt-3 btn-block ${product.countInStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                  >
                    Add to cart
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
