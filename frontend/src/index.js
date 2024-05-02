import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AddSupplierForm from './Components/Supply/AddSupplierForm';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import TestScreen from './Components/Supply/TestScreen';
import SupplierTable from './Components/Supply/Suppliertable';
import EditSupplierForm from './Components/Supply/EditSupplierForm';
import SupplierDashboard from './Pages/SupplierDashboard';

//i change from here
// import OrderTable from './Components/Supply/Ordertable';
import Itemtable from './Components/Supply/Itemtable'; 
import  ReceievedOrders from './Pages/RecievedOrders'; // Adjust the path as necessary


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="/sup">
        <Route path="addSupplier/" element={<AddSupplierForm/>} />

        {/* <Route path="testscreen/:id" element={<TestScreen/>} /> */}
        <Route path="suppliertable/" element={<SupplierTable/>}/>
        <Route path="editsup/:id" element= {<EditSupplierForm/>}/>
        {/* i change from here */}

        {/* <Route path="placeOrder/" element={<OrderTable/>}/> */}
        {/* <Route path="Inventory/" element={<Itemtable/>}/> */}
        <Route path="orders/" element= {<ReceievedOrders/>}/>




      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();