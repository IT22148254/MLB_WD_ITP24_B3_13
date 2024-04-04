import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'

const ContactUs = () => {

    return ( 

        <body>
            <section>
                <Container>
                    <div className="title">Contact Us</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row">
                            <label for="Name" className="promo-lbl">Full Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="name"
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Email" className="promo-lbl">Email Address:</label>
                            <input
                                type="Email"
                                id="Email"
                                name="Email"
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="inquiry" className="promoName">Inquiry:</label>
                            <textarea id="inquiry" name="inquiry"></textarea>
                        <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Create</button>
                                        </div>
                                    </div>
                                    {/*error - this is for me*/}
                                </div>
                        </div>
                    </form>
                </Container>
            </section>
        </body>

     );
}
 
export default ContactUs;