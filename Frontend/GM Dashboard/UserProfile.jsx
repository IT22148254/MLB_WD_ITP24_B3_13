import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'

const ClientProfile = () => {
    return ( 
        <body>
        <section>
            <Container>
            <div className="leftImage">
                    <img/>{/*Logo Img - add this*/}
                </div>
                <div className="title">Edit Profile</div>
                <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                    <div className="add-promo-row">
                        <input
                            type="email"
                            id="Name"
                            name="Email"
                            className="promoInput"
                            placeholder="Enter Email"
                            required />
                    </div>
                    <div className="add-promo-row">
                        <input
                            type="password"
                            id="Details"
                            name="Details"
                            className="promoInput"
                            placeholder="Change Password"
                            required />
                    </div>
                    <div className="add-promo-row">
                        <input
                            type="number"
                            id="Name"
                            name="Email"
                            className="promoInput"
                            placeholder="Contact Number"
                            required />
                    </div>
                    <div class="add-promo-row">
                                <div className="add-promo-btns">
                                    <div>
                                        <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Update</button>
                                        {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
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
 
export default clientProfile;