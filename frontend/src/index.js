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
import EditStandard from './Components/Membership/Manager/EditStandardform'
import TestScreen from './Components/Membership/Manager/TestScreen';
import ScheduleAdd from './Components/Membership/Manager/Scheduleadd';
import ScheduleTable from './Components/Membership/Manager/ScheduleTable';


import { ToastContainer } from 'react-toastify';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route path='changetime/'element={<ChangeTimeOnDayForm/>} /> */}
        {/* <Route path='mmdashboard/' element={<MMDashboard />} /> */}
        {/* <Route path='chngtimeondy/' element={<ChangeTimeOnDy />} /> */}
        {/* <Route path='chngtimeondytbl/' element={<OnetimeChangeTable/>}/>
        <Route path='chngtimeondytbl/:id'element={<ChangeOnetimeEdit/>}/>
        <Route path='schedule/'element={<SceduleTimeSlot/>}/> */}
        {/* <Route path='addnewpr/' element={<AddNewPromoForm />} />
        <Route path='createdpromos/' element={<CreatedPromos />} />
        <Route path='
        ....................................................................................................................................................................................................................................................................................................................................................................' element={<EditPromoForm/>} />
        <Route path="editstandard/:id" element={<EditStandard />} /> */}
        {/* <Route path="/" element={<TestScreen />} /> */}
        {/* <Route path='/' element={<ScheduleAdd/>}/> */}
        <Route path="sch/">
          <Route path="schdeules/" element={<ScheduleTable/>} />
          <Route path="addsch/" element={<ScheduleAdd/>}/>
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
