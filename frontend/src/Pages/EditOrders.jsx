import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from 'reactstrap'
import Order from  './Components/SupOrder'

const EditOrderSup = () => {

    const {id} = useParams()

    return ( 
        <body>
            <section>
                <Container>
                <div /*className="title" */ className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Edit Order</div>
                    <Order id={id}/>
                </Container>
            </section>
        </body>
     );
}
 
export default EditOrderSup;