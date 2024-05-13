<<<<<<< HEAD
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
import "react-toastify/dist/ReactToastify.css";
import LeaveSummary from "./components/LeaveApprovaltable.jsx";
import ApplyLeave from "./components/ApplyLeave.jsx";
import AddSupplierForm from "../src/components/Supply/AddSupplierForm.jsx";
import SupplierTable from "../src/components/Supply/Suppliertable.jsx";
import EditSupplierForm from "../src/components/Supply/EditSupplierForm.jsx";
import SupplierDashboard from "./Pages/SupplierDashboard";
import Inventory from "./Pages/Inventory";
import ReceievedOrders from './Pages/RecievedOrders.jsx';
import AddOrderForm from "./Pages/PlaceOrder";
import EditOrderForm from "./Pages/EditOrders";
import PlacedOrdersView from "./Pages/placedOrders.jsx";
import Supplierhandling from "./Pages/SupplierDashbaord(2)";
import OrderHandling from "./Pages/OrderHandling";
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ServiceFeedbackForm from './Components/Feedback/User/ServiceFeedbackForm';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import TestScreen from './Components/Feedback/TestScreen';
import ServiceFeedbackTable from './Components/Feedback/User/ServiceFeedbackTable';
import EditServiceFeedbackForm from './Components/Feedback/User/EditServiceFeedbackForm';
import Selectoption from './Pages/Selectoption'
import Coachfeedback from './Components/Feedback/User/CoachFeedbackForm'; 
import CoachFeedbackTable from './Components/Feedback/User/CoachFeedbackTable';
import CoachFeedbackEditForm from './Components/Feedback/User/CoachFeedbackEditForm';
import CoachFeedbackApproval from './Components/Feedback/Manager/CoachFeedbackApproval';
import ServiceFeedbackApproval from './Components/Feedback/Manager/ServiceFeedbackApproval';
import { ToastContainer } from 'react-toastify';

{/* i chnange from here */}
// import Selectoption from './Pages/Selectoption'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      
      <Route path='fbk/'>
      <Route path="" element={<Selectoption/>}/>
        <Route path='addservice/' element={<ServiceFeedbackForm/>} />
        <Route path ="testscreen/:id" element = {<TestScreen/>}/>
        <Route path="servicetable/" element={<ServiceFeedbackTable/>}/>
        <Route path="editservice/:id" element={<EditServiceFeedbackForm/>}/>
        
               {/* i chnange from here */}

        
        <Route path="coachfeedback/" element={<Coachfeedback/>}/>
        <Route path="coachfeedbacktable/" element={<CoachFeedbackTable/>}/>
        <Route path="coachfeedbackedit/:id" element={<CoachFeedbackEditForm/>}/>
        <Route path="selectopt/" element={<Selectoption/>}/>
        <Route path="coachfeedbackapprove/" element={<CoachFeedbackApproval/>}/>
        <Route path="servicefeedbackapprove/" element={<ServiceFeedbackApproval/>}/>
 
      </Route>
    </Route>


  )
)
>>>>>>> origin/chathumi

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<DefaultScreen />} />
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
      <Route path="/success" element={<Success />} />
      <Route path="/payment/check" element={<Report_generate />} />

      {/* supplier */}

      <Route path="/sup">
        <Route path="addSupplier/" element={<AddSupplierForm />} />

        {/* <Route path="testscreen/:id" element={<TestScreen/>} /> */}
        <Route path="suppliertable/" element={<SupplierTable />} />
        <Route path="editsup/:id" element={<EditSupplierForm />} />
        <Route path="orders/" element={<ReceievedOrders />} />
        <Route path="ordersform/" element={<AddOrderForm />} />
        <Route path="Inventory/" element={<Inventory />} />
        <Route path="supDashboard2" element={<Supplierhandling/>}/>
        <Route path="placedOrders/" element={<PlacedOrdersView/>} />
        <Route path="editorder/:id" element={<EditOrderForm />} />
        <Route path="supDashboard" element={<SupplierDashboard />} />
        <Route path="Orderhandling" element={<OrderHandling/>} />
      </Route>

      {/* protcted */}

      <Route path="" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="store/payment" element={<PaymentScreen />} />
        <Route path="/store/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/store/orderst/:id" element={<OrderScreen />} />
        <Route path="/store/admin" element={<AdminPortalScreen />} />
        <Route path="/store/admin/items" element={<AdminItemsScreen />} />
        <Route path="/store/admin/orders" element={<AdminOrdersScreen />} />
        <Route path="/store/admin/item/:id/edit"element={<ProductEditScreen />}
        />
        <Route path="/orderst/myorders/:id" element={<OrdersScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
=======
     <RouterProvider router={router} />
     <ToastContainer />
>>>>>>> origin/chathumi
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
