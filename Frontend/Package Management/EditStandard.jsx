import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'

const EditStandard = () => {

    const [stPackageName, setStPackageName] = useState("")
    const [stPackageDescription, setStPackageDescription] = useState("")
    const [stPackagePrice, setStPackagePrice] = useState("")

    return ( 
        <body>
            <section>
                <Container>
                    <div className="title">Edit Standard Package</div>
                    <div className="leftImage">
                        <img/>{/*left side Image - add this*/}
                    </div>
                    <form method="POST" className="add-promo">
                        <div className="add-promo-row">
                            <label for="Name" className="promo-lbl">Package Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="name"
                                className="promoInput"
                                value={stPackageName}
                                onChange={(e) => setStPackageName(e.target.value)}
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Details" className="promo-lbl">Package Details:</label>
                            <input
                                type="text"
                                id="Details"
                                name="Details"
                                className="promoInput"
                                value={stPackageDescription}
                                onChange={(e)=> setStPackageDescription(e.target.value)}
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Price" className="promo-lbl">Package Price:</label>
                            <input
                                type="text"
                                id="Price"
                                name="Price"
                                className="promoInput"
                                value={stPackagePrice}
                                onChange={(e)=> setStPackagePrice(e.target.value) }
                                required />
                                </div>
                        <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Save</button>
                                        </div>
                                    </div>
                                    {/*error - this is for me*/}
                                </div>
                    </form>
                </Container>
            </section>
        </body>
     );
}
 
export default EditStandard;