import { Outlet } from 'react-router-dom'
import React from 'react';
// import Layout from './Components/Layout/Layout';
import Footer from './HAF/Footer'

function App() {
  return (
    <>

      <main>
        <div style={{ height: "auto", width: "auto" }}>
          <Outlet />
        </div>
      </main>


    </>
  );
}

export default App;
