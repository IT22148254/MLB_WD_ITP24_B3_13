import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap"; // Remove unnecessary imports from Bootstrap
import CheckoutSteps from "../content/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../content/Message";
import Loader from "../content/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { useUpdateProductMutation } from "../slices/productsApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/store/paymentt");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      console.log(cart.cartItems);
      console.log('Is Paid:', cart.payment.paid,
      "---" ,cart.payment.paidAt,);
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: Number(cart.itemPrice).toFixed(2),
        shippingPrice: cart.delPrice,
        totalPrice: cart.totPrice,
        isPaid:cart.payment.paid,
        paidAt: cart.payment.paidAt,
      }).unwrap();
      console.log(res);
      dispatch(clearCartItems());
      navigate(`/store/orderst/${res._id}`);

      cart.cartItems.map((item) =>
        updateProduct({
          ...item,
          countInStock: item.countInStock - item.quantity,
        })
      );

      toast.success("Placed order successfully");

    } catch (error) {
      toast.error("Something went wrong while placing the order");
    }
  };

  if (loadingUpdate) {
    return <Loader />;
  }

  return (
    <div className="mx-4">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="flex flex-wrap">
        <div className="md:w-2/3 pr-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Shipping</h2>
            <p className="mt-2">
              <strong>Address : </strong> {cart.shippingAddress.address}
            </p>
          </div>
          <div className="mb-4">
            <strong className="font-bold">Method : </strong>{" "}
            {cart.paymentMethod}
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Order items :</h2>{" "}
            {cart.cartItems.length === 0 ? (
              <Message>No items in the cart</Message>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="mb-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <Link
                        to={`/product/${item._id}`}
                        className="ml-4 text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="mt-2">
                      {Number(item.price).toFixed(2)} LKR X {item.quantity} ={" "}
                      {Number(item.price * item.quantity).toFixed(2)} LKR
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="mb-4">
              <div className="flex justify-between">
                <span>Items price</span>
                <span>{Number(cart.itemPrice).toFixed(2)} LKR</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between">
                <span>Delivery price</span>
                <span>{Number(cart.delPrice).toFixed(2)} LKR</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between">
                <span>Total price</span>
                <span>{Number(cart.totPrice).toFixed(2)} LKR</span>
              </div>
            </div>
            <div className="mb-4">
              {error && <Message variant="danger">{error}</Message>}
            </div>
            <Button
              type="button"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Place Order
            </Button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
