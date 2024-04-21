import React from "react";
import Header from "./content/header";
import Footer from "./content/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <div style={{ height: "auto", width: "auto" }}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <ToastContainer/>
    </>
  );
};

export default App;
