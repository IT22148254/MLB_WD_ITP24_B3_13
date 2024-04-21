import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from 'axios'

const PromoDetails = ({ promo }) => {

    const handleDelete =  () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/PromoPackages/${promo.id}`)
            .then(response => {

                // Refresh the table to show updated data
                Swal.fire({
                        title: "Success",
                        text: "Package deleted successfully",
                        icon: "success",
                      }).then(()=>{
                        console.log('Package rejected successfully')
                      })

                window.location.reload();

            })
            .catch(error => {
            Swal.fire({
                        title: "Error",
                        text: "package rejection failed",
                        icon: "success",
                      }).then(()=>{
                        console.log('Error rejecting package:', error);

                      })
            })
              }
          });
      
    }

const handleEdit =() => {
//navigate to promo

}



    return (
        <div class="prm-packages">
            <br />
            {/*<img src={image} alt="" className='prm-image' /> <br /><br />*/}
            <h2 class="prm-name">{promo.Name}</h2>
            <p class="prm-price">LKR {promo.Price}</p>
            <p class="prm-description">{promo.Discription}</p>
            <p class="prm-validity">Valid Until {promo.Duration}</p>
            <p><button class="prm-edit-btn" onClick={handleEdit}>Edit</button></p>
            <p><button class="prm-edit-btn" onClick={handleDelete}>Delete</button></p>
        </div>
    )
}

export default PromoDetails;