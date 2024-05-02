import React from "react";
import Header from "./content/header";
import { ToastContainer } from "react-bootstrap";
import { Outlet } from "react-router-dom";



const App = () => {
  return (
    <>
      <Header>
        <main>
          <ToastContainer/>
          <dev style={{height:"auto",width:"auto"}}>
            <Outlet/>
          </dev>
        </main>
      </Header>
    </>
  );
};

export default App;
