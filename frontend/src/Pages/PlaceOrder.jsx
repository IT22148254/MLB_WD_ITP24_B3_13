import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import Order from  './Components/SupOrder'
const PlaceOrderSup = () => {
    
    return (  
        <body>
            <section>
                <Container>
                <div /*className="title" */ className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Place Orders</div>
                    <Order/>
                </Container>
            </section>
        </body>
    );
}
 
export default PlaceOrderSup;