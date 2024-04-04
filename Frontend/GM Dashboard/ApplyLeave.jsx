import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'

const ApplyLeave = () => {
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
                            type="Date"
                            id="Name"
                            name="Email"
                            DateFormat="DD/MM/YYYY"
                            className="promoInput"
                            placeholder="Date-From:"
                            required />
                    </div>
                    <div className="add-promo-row">
                    <input
                            type="Date"
                            id="Name"
                            name="Email"
                            DateFormat="DD/MM/YYYY"
                            className="promoInput"
                            placeholder="Date-To:"
                            required />
                    </div>
                    <div className="add-promo-row">
                        <select name="Supname" id="Name" className="dropdown" >
                            <option value="Senura Nawanjana" selected>Senura Nawanjana</option>
                            {/*Other Options will be build*/}
                        </select> 
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
 
export default ApplyLeave;