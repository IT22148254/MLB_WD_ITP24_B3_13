import { Container} from 'reactstrap'
import OrderTable from '../Components/Supply/Ordertable';
import bg from "../Images/bg_main.jpg";

const ReceievedOrders = () => {

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };


    return ( 
           
        <OrderTable/>
                
     );
}
 
export default ReceievedOrders;

