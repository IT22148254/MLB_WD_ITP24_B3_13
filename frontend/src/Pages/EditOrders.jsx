import { useParams } from "react-router-dom"
import EditOrderForm from  '../Components/Supply/EditSupOrderForm'

const EditOrderSup = () => {

    const {id} = useParams()

    return ( 
       < EditOrderForm/>
     );
}
 
export default EditOrderSup;