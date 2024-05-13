// import Package from  '../Supplier Management/Pages/ADd'
<<<<<<< HEAD
import Package from  '../../Pages/SupplierDashbaord(2)'
=======
import AddCoachFeedback from  '../../Pages/CoachFeedback'
import  { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

>>>>>>> origin/chathumi
const Layout = () => {
    return (  
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AddCoachFeedback/>}/>
        </Routes>
    </BrowserRouter>

    );
}

export default Layout;