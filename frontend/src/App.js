import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header1 from "./Pages/Header";
import Footer from "./content/Footer";

const App = () => {
  return (
    <>
      <Header1 />
      <main>
        
        <ToastContainer />
        <Outlet />
        
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
