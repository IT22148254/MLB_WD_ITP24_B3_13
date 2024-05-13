import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./bootstrap/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { Provider } from "react-redux";
import store from "./store";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";
import { ProtectedRoute } from "./content/ProtectedRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AdminPortalScreen from "./screens/AdminPortalScreen";
import AdminOrdersScreen from "./screens/AdminOrdersScreen";
import AdminItemsScreen from "./screens/AdminItemsScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import DefaultScreen from "./screens/DefaultScreen";
import EmployeeSummary from "./screens/EmployeeSummary";
import AddEmployee from "./screens/AddEmployee";
import EditEmployee from "./screens/EditEmployee";
import View from "./payment_component/View.js";
import Add from "./payment_component/Add.js";
import Edit from "./payment_component/Edit.js";
import Allpayments from "./payment_component/Allpayments.js";
import Success from "./payment_component/Success.js";
import Report_generate from "./payment_component/Report_generate.js";
//import './App.css';
import SalaryCalculator from "./screens/SalaryCalculator.jsx";
import 'react-toastify/dist/ReactToastify.css';
import LeaveSummary from "./components/LeaveApprovaltable.jsx";
import ApplyLeave from "./components/ApplyLeave.jsx"
import AddSupplierForm from './Components/Supply/AddSupplierForm';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import SupplierTable from './Components/Supply/Suppliertable';
import EditSupplierForm from './Components/Supply/EditSupplierForm';
import SupplierDashboard from './Pages/SupplierDashboard';
import Inventory from './Pages/Inventory';
import Itemtable from './Components/Supply/Itemtable'; 
import  ReceievedOrders from './Pages/RecievedOrders'; // Adjust the path as necessary
import AddOrderForm from './Pages/PlaceOrder';
import EditOrderForm from './Pages/EditOrders';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<DefaultScreen/>}  />
      <Route path="/store" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />

      {/* employee */}

      <Route path="/emp/" element={<EmployeeSummary />} />
      <Route path="/emp/add" element={<AddEmployee />} />
      <Route path="/emp/edit/:id" element={<EditEmployee />} />
      <Route path="/emp/calculator" element={<SalaryCalculator />} />
      {/* <Route path="/calculator" element={<SalaryCalculator />} /> */}
          <Route path="emp/addleave" element={<ApplyLeave />} />
          <Route path="emp/showleave" element={<LeaveSummary />} />

      {/* payment */}

      <Route path="/payment/view/:id" element={<View />} />
      <Route path="/payment/add" element={<Add />} />
      <Route path="/payment/edit/:id" element={<Edit />} />
      <Route path="/payment/all" element={<Allpayments />} />
      <Route path="/success" element={<Success/>}/>
      <Route path="/payment/check" element={<Report_generate/>}/>


      {/* supplier */}

      <Route path="/sup">
        <Route path="addSupplier/" element={<AddSupplierForm/>} />

        {/* <Route path="testscreen/:id" element={<TestScreen/>} /> */}
        <Route path="suppliertable/" element={<SupplierTable/>}/>
        <Route path="editsup/:id" element= {<EditSupplierForm/>}/>
        
        {/* i change from here */}

        {/* <Route path="Inventory/" element={<Itemtable/>}/> */}
        <Route path="orders/" element= {<ReceievedOrders/>}/>
        <Route path="ordersform/" element= {<AddOrderForm/>}/>
        <Route path="Inventory/" element= {<Inventory/>}/>

        <Route path="EditOrderForm/:id" element= {<EditOrderForm/>}/>
        <Route path="supDashboard" element= {<SupplierDashboard/>}/>        

      </Route>


      {/* protcted */}

      <Route path="" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="store/payment" element={<PaymentScreen/>}/>
        <Route path="/store/placeorder" element={<PlaceOrderScreen/>}/>
        <Route path="/store/orderst/:id" element={<OrderScreen/>} />
        <Route path="/store/admin" element={<AdminPortalScreen/>} />
        <Route path="/store/admin/items" element={<AdminItemsScreen/>} />
        <Route path="/store/admin/orders" element={<AdminOrdersScreen/>} />
        <Route path="/store/admin/item/:id/edit" element={<ProductEditScreen/>}/>
        <Route  path="/orderst/myorders/:id" element={<OrdersScreen/>} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
