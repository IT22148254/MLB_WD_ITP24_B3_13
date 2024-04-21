// import Package from  '../Supplier Management/Pages/ADd'
import AddCoachFeedback from  '../../Pages/CoachFeedback'
import  { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

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