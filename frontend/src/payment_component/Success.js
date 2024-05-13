import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { setPayment } from '../slices/cartSlice';
import 'react-toastify/dist/ReactToastify.css';
import './Success.css'; // Import the CSS file for Success component

export default function Success() {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  

  React.useEffect(() => {
    // Display the success toast message
    toast.success('Payment successful!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


    // Navigate back two pages after a delay
    setTimeout(() => {
      if(cart.cartItems){
        dispatch(setPayment({ paid: true, paidAt: new Date() }));
      }
      window.history.go(-2);
    }, 3000); // Adjust the delay as needed
  }, []);

  return (
    <div>
      <center>
        {/* Content here if needed */}
      </center>
      <ToastContainer />
    </div>
  );
}
