import { useParams } from 'react-router-dom';
import EditPromoform from '../Components/Membership/EditPromoform'

const EditPromo = () => {

    const {id} = useParams();

    return (  
        <EditPromoform id={id}/>
    );
}
 
export default EditPromo;