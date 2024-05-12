import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Success.css'; // Import the CSS file for Success component

export default function Success() {
  React.useEffect(() => {
    // Display the success toast message
    toast.success('Payment successful!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Navigate back two pages after a delay
    setTimeout(() => {
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
