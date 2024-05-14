import React from "react";
import Header from "./content/header";
import Footer from "./content/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <main>
      <ToastContainer />
        <div style={{ height: "auto", width: "auto" }}>
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
