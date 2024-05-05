import React from "react";
import { Outlet } from "react-router-dom";



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
