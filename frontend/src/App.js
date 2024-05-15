import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <main>
      <ToastContainer />
          <Outlet />
      </main>
    </>
  );
};

export default App;
