import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Message from "../content/Message";
import React from "react";
import { addToCart, remFromCart } from "../slices/cartSlice";
import Header from "../content/header";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const addToCartHandler = async (itm, quantity) => {
    dispatch(addToCart({ ...itm, quantity }));
  };

  const remFromCartHandler = async (id) => {
    dispatch(remFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
    <Header />
    <div className="container mx-auto py-5">
      <div className="md:flex justify-between">
        <div className="md:w-8/12">
          <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is Empty <Link to="/store">Go back</Link>
            </Message>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item._id} className="py-4 flex items-center">
                  <div className="flex-shrink-0 w-24">
                    <img src={item.image} alt={item.name} className="w-full rounded-md" />
                  </div>
                  <div className="ml-4 flex-grow">
                    <Link to={`/product/${item._id}`} className="font-medium text-lg text-blue-500 hover:underline">
                      {item.name}
                    </Link>
                    <div>LKR: {item.price}</div>
                    <div>
                      <select
                        value={item.quantity}
                        onChange={(e) => {
                          addToCartHandler(item, Number(e.target.value));
                        }}
                        className="rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                        onClick={() => remFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:w-4/12 mx-3">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Sub-Total ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
            </h2>
            <h4 className="text-lg">
              LKR:{" "}
              {cartItems
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </h4>
            <button
              type="button"
              className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to checkout
            </button>
            <div className="mt-4">
              {userInfo !== null ? (
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                  disabled={userInfo === null}
                  onClick={(e) => navigate(`/orderst/myorders/${userInfo._id}`)}
                >
                  My orders
                </button>
              ) : (
                <Message> Log in to view all orders </Message>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartScreen;
