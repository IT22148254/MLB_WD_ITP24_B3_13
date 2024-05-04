import React from "react";
import Header from "./content/header";
import { ToastContainer } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./content/Footer";



const App = () => {
  return (
    <>
      <Header/>
        <main>
          <ToastContainer/>
          <div style={{height:"auto",width:"auto"}}>
            <Outlet/>
          </div>
        </main>
      <Footer/>
    </>
  );
};

export default App;
