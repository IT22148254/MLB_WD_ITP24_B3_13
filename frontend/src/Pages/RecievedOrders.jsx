import { Container} from 'reactstrap'
import OrderTable from './Components/Ordertable';
const receievedOrders = () => {

    return ( 
        <section>
            <Container>
                <h1>Recieved Orders</h1>
                <OrderTable/>
            </Container>
        </section>
     );
}
 
export default receievedOrders;