import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TestScreen from './Components/Membership/Manager/TestScreen';
import EmailTable from './Components/Membership/Manager/EmailTable';
import EditEmail from './Components/Membership/Manager/EditEmail';
import EmailForm from './Components/Membership/Manager/EmailForm';
import MemberRegistration from './Components/Membership/User/member registration';
import "./bootstrap/css/bootstrap.min.css";
import "./index.css";
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
import UserTable from './Components/Membership/Manager/Usertable';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<DefaultScreen />} />
      <Route index={true} path="/store" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />

      <Route path="/mr/" element={<MemberRegistration />} />
      <Route path="emailtable/" element={<EmailTable />} />
      {/* <Route path='mmdashboard/' element={<MMDashboard />} />
        <Route path='createdpromos/' element={<CreatedPromos />} />
        <Route path='editpromo/:id' element={<EditPromoForm/>} />
        <Route path="editstandard/:id" element={<EditStandard />} /> */}
      {/* <Route path="testscreen/" element={<TestScreen />} /> */}
      <Route path="testscreen/" element={<TestScreen />} />
      <Route path="addemail/" element={<EmailForm/>}/>
      <Route path="editemail/:id" element={<EditEmail />} />
      <Route path="usertable/" element={<UserTable/>}/>

      <Route path="" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="store/payment" element={<PaymentScreen />} />
        <Route path="/store/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/store/orderst/:id" element={<OrderScreen />} />
        <Route path="/store/admin" element={<AdminPortalScreen />} />
        <Route path="/store/admin/items" element={<AdminItemsScreen />} />
        <Route path="/store/admin/orders" element={<AdminOrdersScreen />} />
        <Route path="/store/admin/item/:id/edit" element={<ProductEditScreen />} />
        <Route path="/orderst/myorders/:id" element={<OrdersScreen />} />
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
