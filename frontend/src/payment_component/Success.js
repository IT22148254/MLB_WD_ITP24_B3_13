import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Success.css'; // import the CSS file for Success component

export default function Success() {
  React.useEffect(() => {
    toast.success('Payment successful!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  return (
    <div>
      <center>
        <button className="pay-button" onClick={() => window.location.href = "http://localhost:3000/"}>Home</button>
      </center>
      <ToastContainer />
    </div>
  );
}
