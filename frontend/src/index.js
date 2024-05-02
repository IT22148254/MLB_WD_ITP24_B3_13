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
import SalaryCalculator from "./screens/SalaryCalculator.jsx";
import 'react-toastify/dist/ReactToastify.css';

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

reportWebVitals();
