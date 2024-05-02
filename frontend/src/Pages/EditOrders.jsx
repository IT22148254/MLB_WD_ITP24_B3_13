import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from 'reactstrap'
import EditOrderForm from  '../Components/Supply/EditSupOrderForm'

const EditOrderSup = () => {

    const {id} = useParams()

    return ( 
       < EditOrderForm/>
     );
}
 
export default EditOrderSup;