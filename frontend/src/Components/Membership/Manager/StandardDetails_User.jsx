import React from "react";
import Swal from "sweetalert2"
const StandardDetails_user = ({ standard, filteredPackage }) => {
    const isFiltered = filteredPackage?.stPackageName === standard.stPackageName

    const handleSelect = ()=>{

    }
    if(isFiltered===true){
        return (
            // <div 
            //     className={`package ${isHighlighted ? "highlighted" : ""}`}
            //     style={{
            //         width: '400px', 
            //         height: '400px', 
            //         boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 1)',
            //         margin: '20px',
            //         textAlign: 'center',
            //         padding: '10px',
            //         borderRadius: '20px'
            //     }}
            // >
            <div className='std-packages'>
                <br />
                {/*<img src={image} alt="" className='std-image' /> <br /><br />*/}
                <h2 class="std-name">{standard.stPackageName}</h2>
                <p class="std-price">LKR {standard.stPackagePrice}</p>
                <p class="std-description">{standard.stPackageDescription}</p><br />
                <p><button class="std-edit-btn" onClick={handleSelect}>Select</button></p>
            </div>
        )

    }else{
        Swal.fire({
            title: "Error",
            text: "Cannot found Searched Package",
            icon: "error",
          }).then(()=>{
            console.log('Cannot found Searched Package')
          })
    }
}
    

export default StandardDetails_user;