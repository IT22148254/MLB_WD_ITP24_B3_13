import React from "react";
import { Container } from "react-bootstrap";
import Header from "./content/header";
import Footer from "./content/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header/>
      <main>
        <div style={{height:"auto",width:"auto"}}>
          <Outlet/>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
