import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { setPayment } from '../slices/cartSlice';
import 'react-toastify/dist/ReactToastify.css';
import './Success.css'; // Import the CSS file for Success component
import axios from 'axios';
import { clearCartItems } from '../slices/cartSlice';

export default function Success() {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const id = auth.userInfo._id

  React.useEffect(() => {
    
    const pkg = localStorage.getItem('pkg')

    if(cart.cartItems && pkg === null){
      dispatch(setPayment({ paid: true, paidAt: new Date() }));
  
      setTimeout(() => {
        window.history.go(-2);
      }, 3000); 

    }

    if(pkg !== null){
      console.log(pkg)

      axios
      .put(`/user/${id}`, { Package:pkg,PrPackage:pkg })
      .then((response) => {
        console.log(id)

        dispatch(clearCartItems());

        localStorage.removeItem('pkg')
    
        setTimeout(() => {
          window.history.go(-3);
        }, 3000); 

      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
      });
    }

    if(cart.cartItems && pkg !== null){
      console.log(pkg)

      axios
      .put(`/user/${id}`, { Package:pkg,PrPackage:pkg })
      .then((response) => {
        //console.log(id)

        dispatch(clearCartItems());

        localStorage.removeItem('pkg')
    
        setTimeout(() => {
          window.history.go(-3);
        }, 3000); 

      })
      .catch((error) => {
        console.error("Error updating inventory:", error);
      });
    }

    toast.success('Payment successful!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    
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
