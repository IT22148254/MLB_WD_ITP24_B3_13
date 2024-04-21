import React from "react";
import Swal from "sweetalert2"

const PromoDetails_user = ({ promo, filteredPackage }) => {
    const isFiltered = filteredPackage?.Name === promo.Name

    const handleSelect = ()=>{

    }

    if(isFiltered===true){
    return (
        // <div 
        //     className={`package ${isHighlighted ? "highlighted" : ""}`}
        //     style={{
        //         width: '280px',
        //         height: '370px',
        //         padding: '10px',
        //         borderRadius: '20px',
        //         boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 1)',
        //         margin: '20px',
        //         textAlign: 'center'
        //     }}
        // >
        <div className='promo-packages'>
            <br />
            {/*<img src={image} alt="" className='promo-image' /> <br /><br />*/}
            <h2 class="promo-name">{promo.Name}</h2>
            <p class="promo-price">LKR {promo.Price}</p>
            <p class="promo-description">{promo.Discription}</p>
            <p class="promo-validity">Valid Until {promo.Duration}</p>
            <p><button class="promo-select-btn" onClick={handleSelect}>Select</button></p>
        </div>
    )
}
else{
    Swal.fire({
        title: "Error",
        text: "Cannot found Searched Package",
        icon: "error",
      }).then(()=>{
        console.log('Cannot found Searched Package')
      })
}
}

export default PromoDetails_user;
