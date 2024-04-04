import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import Order from  './Components/SupOrder'
const PlaceOrderSup = () => {
    
    return (  
        <body>
            <section>
                <Container>
                    <div className="title">Place Orders</div>
                    <Order/>
                </Container>
            </section>
        </body>
    );
}
 
export default PlaceOrderSup;