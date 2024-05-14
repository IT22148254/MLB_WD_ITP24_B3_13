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
import ShowFeedback2  from  './Components/Feedback/User/ShowFeedback2'
import ShowFeedback from './Components/Feedback/User/ShowFeedback';


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
 

        <Route path="ShowFeedback/" element={<ShowFeedback/>}/>
        <Route path="ShowFeedback2/" element={<ShowFeedback2/>}/>

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
