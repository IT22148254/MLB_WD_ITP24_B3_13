import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../slices/ordersApiSlice";
import Loader from "../content/Loader";
import { toast } from "react-toastify";

const EditOrderScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);
  const [isPaid, setIsPaid] = useState("");
  const [isDelivered, setIsDelivered] = useState("");
  const [paidAt, setPaidAt] = useState("");
  const [deliveredAt, setDeliveredAt] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [itemsPrice, setItemsPrice] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (order) {
      setIsPaid(order.isPaid);
      setIsDelivered(order.isDelivered);
      setPaidAt(order.paidAt);
      setDeliveredAt(order.deliveredAt);
      setPaymentMethod(order.paymentMethod);
      setUser(order.user.Fname);
      setEmail(order.user.Email);
      setItemsPrice(order.itemsPrice);
      setShippingPrice(order.shippingPrice);
      setTotalPrice(order.totalPrice);
      setAddress(order.shippingAddress.address);
      setCity(order.shippingAddress.city);
      setDistrict(order.shippingAddress.district);
      setStreet(order.shippingAddress.street);
    }
  }, [order]);

  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const updatedOrder = {
    _id: id,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
    shippingAddress: {
      address,
      city,
      district,
      street,
    },
    shippingPrice,
    totalPrice,
  };

  const validateForm = () => {
    let isValid = true;
  
    if (!shippingPrice || !totalPrice || !address || !city || !district || !street) {
      isValid = false;
      toast.error("Please fill in all required fields.");
      return isValid;
    }
  
    if (isNaN(shippingPrice) || isNaN(totalPrice) || shippingPrice < 0 || totalPrice < 0) {
      isValid = false;
      toast.error("Please enter a valid shipping price and total price.");
      return isValid;
    }
  
    const regex = /^[A-Za-z\s]+$/;
  
    if (!regex.test(city)) {
      isValid = false;
      toast.error("City should contain only letters and spaces.");
      return isValid;
    }
  
    if (!regex.test(district)) {
      isValid = false;
      toast.error("District should contain only letters and spaces.");
      return isValid;
    }
  
    if (!regex.test(street)) {
      isValid = false;
      toast.error("Street should contain only letters and spaces.");
      return isValid;
    }
  
    return isValid;
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const result = await updateOrder(updatedOrder);
      if (result.error) {
        console.log(error);
        toast.error("Something went wrong");
      } else {
        toast.success("Successfully updated the order");
      }
      navigate("/store/admin/orders");
    }
  };

  //console.log(totalPrice);

  useEffect(() => {
    setTotalPrice(Number(shippingPrice) + Number(itemsPrice));
  }, [shippingPrice, itemsPrice]);

  //console.log(order);

  if (isLoading || isUpdating) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid grid-cols-5 m-10 p-5">
        <div className="col-span-1">
          <div className="mb-10">
            <p className="font-bold text-3xl">Ordered Items</p>
          </div>
          {order &&
            order.orderItems.map((item) => (
              <div key={item.product}>
                <div>
                  <img src={item.image} alt={item.name} className="w-10 h-10" />
                </div>
                <div>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
                <div>
                  {item.quantity} x LKR {item.price} = LKR{" "}
                  {(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
        </div>
        <div className="col-span-3">
          <div className="mb-10">
            <p className="font-bold text-3xl">Edit Order</p>
          </div>
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-3xl">Customer Details</p>
                  <p className="font-medium text-lg mt-4">First name     : {user}</p>
                  <p className="font-medium text-lg mt-4">Payment method : {paymentMethod}</p>
                  <p className="font-medium text-lg mt-4">Email address  : {email}</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="text-gray-600">
                    <p className="font-medium text-3xl">Order Details</p>
                  </div>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-3">
                      <label htmlFor="address">Payed date</label>
                      <input
                        type="datetime-local"
                        name="payedAt"
                        id="payedAt"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formattedDate(paidAt)}
                        onChange={(e) => setPaidAt(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="isPaid">Payment status</label>
                      <select
                        name="isPaid"
                        id="isPaid"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={isPaid}
                        onChange={(e) =>
                          setIsPaid(Boolean(e.target.value === "true"))
                        }
                      >
                        <option value={true}>Paid</option>
                        <option value={false}>Not Paid</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address">Delivary price</label>
                      <input
                        type="text"
                        name="shippingPrice"
                        id="shippingPrice"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={shippingPrice}
                        onChange={(e) => setShippingPrice(Number(e.target.value))}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address">Total price</label>
                      <input
                        type="text"
                        name="totalPrice"
                        id="totalPrice"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={totalPrice}
                        onChange={(e)=> setTotalPrice(Number(e.target.value))}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Delivered date</label>
                      <input
                        type="datetime-local"
                        name="deliveredAt"
                        id="deliveredAt"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formattedDate(deliveredAt)}
                        onChange={(e) => setDeliveredAt(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="isPaid">Delivary status</label>
                      <select
                        name="isDelivered"
                        id="isDelivered"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={isDelivered}
                        onChange={(e) =>
                          setIsDelivered(Boolean(e.target.value === "true"))
                        }
                      >
                        <option value={true}>Delivered</option>
                        <option value={false}>Not Delivered</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">Street</label>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">City</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          name="city"
                          id="city"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">District</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          name="district"
                          id="district"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={submitHandler}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">Price</div>
    </>
  );
};

export default EditOrderScreen;
