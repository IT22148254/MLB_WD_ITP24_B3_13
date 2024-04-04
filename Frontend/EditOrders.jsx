import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import Order from  './Components/SupOrder'

const EditOrderSup = () => {

    return ( 
        <body>
            <section>
                <Container>
                    <div className="title">Edit Orders</div>
                    <Order/>
                </Container>
            </section>
        </body>
     );
}
 
export default EditOrderSup;