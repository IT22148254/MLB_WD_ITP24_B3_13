import './App.css';
import Allpayments from './payment_component/Allpayments';
import Navbar from './payment_component/Navbar';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import View from './payment_component/View';
import Add from './payment_component/Add';
import Edit from './payment_component/Edit';
import Home from './payment_component/Home';
import Success from './payment_component/Success';
import Report_generate from './payment_component/Report_generate';
function App() {
  return (
  <BrowserRouter>
     <Navbar/>
      <Routes >
      <Route  path='/' element={<Home />} />
          <Route  path='/allpayments' element={<Allpayments />} />
          <Route  path='/add' element={<Add />} />
          <Route  path="/view/:id" element={<View />} />
          <Route  path="/edit/:id" element={<Edit />} />
          <Route  path='/success' element={<Success />} />
          <Route  path='/check' element={<Report_generate/>}/>
          
          

      </Routes>
   
  </BrowserRouter>
  );
}

export default App;
