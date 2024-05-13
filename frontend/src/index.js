import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MMDashboard from './Pages/Manager/MMDashboard';
import AddNewPromoForm from './Components/Membership/Manager/AddNewPromoForm'
import CreatedPromos from './Components/Membership/Manager/CreatedPromosTable'
import EditPromoForm from './Components/Membership/Manager/EditPromoform';
import AddNewStandedForm from './Components/Membership/Manager/AddNewPromoForm'
import CreatedStanded from './Components/Membership/Manager/CreatedStandedTable'
import EditStandedForm from './Components/Membership/Manager/EditStandedForm';
import PackageDashboard from './Components/Membership/Manager/packagedashboard';



import TestScreen from './Components/Membership/Manager/TestScreen';
import { ToastContainer } from 'react-toastify';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='pkg/'>
        <Route path='mmdashboard/' element={<MMDashboard />} />
        <Route path='addnewpr/' element={<AddNewPromoForm />} />
        <Route path='createdpromos/' element={<CreatedPromos />} />
        <Route path='editpromo/:id' element={<EditPromoForm/>} />
{/* dashboard */}
        <Route path='pkgDashboard/' element={<PackageDashboard/>} />


        <Route path='addnewst/' element={<AddNewStandedForm />} />
        <Route path='createdstanded/' element={<CreatedStanded />} />
        <Route path='editstanded/:id' element={<EditStandedForm/>}/> 
  
          <Route path="testscreen/" element={<TestScreen />} />

      </Route>
    </Route>


  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();










