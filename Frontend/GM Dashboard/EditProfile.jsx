import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'

const EditProfile = () => {
    return ( 
        <body>
            <section>
                <Container>
                <div className="leftImage">
                        <img/>{/*Profie Img - add this*/}
                    </div>
                    <div className="title">Edit Profile</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row">
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                className="promoInput"
                                placeholder="Name"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <input
                                type="Email"
                                id="Email"
                                name="Email"
                                className="promoInput"
                                placeholder="Email"
                                required /> {/*add email Icon here*/}
                        </div>
                        <div className="add-promo-row">
                            <input
                                type="number"
                                id="Name"
                                name="Number"
                                className="promoInput"
                                placeholder="Contact Number"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <input
                                type="Date"
                                id="Name"
                                name="Number"
                                DateFormat="dd/MM/yyyy"
                                className="promoInput"
                                placeholder="Birthday"
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
 
export default EditProfile;