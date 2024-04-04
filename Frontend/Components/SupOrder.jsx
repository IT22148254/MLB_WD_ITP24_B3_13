import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'

const SupOrder = () => {

    const[orderID, setorderID] = useState('')
    const[supName, setsupName] = useState('')
    const[prName, setprName] = useState('')
    const [quantity, setquantity] = useState(0)
    const[size, setsize] = useState('')

    return ( 
        <body>
            <section>
                <Container>
                <form method="POST" className="add-promo">
                        <div className="add-promo-row">
                            <label for="Name" className="promo-lbl">Supplier Name:</label>
                            <select name="Supname" id="Name" className="dropdown">
                                <option value="Senura Nawanjana" selected>Senura Nawanjana</option>
                                {/*Other Options will be build*/}
                            </select>
                        </div>
                        <div className="add-promo-row">
                            <label for="Details" className="promo-lbl">Product Name:</label>
                            <input
                                type="text"
                                id="Details"
                                name="Details"
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Price" className="promo-lbl">Quantity:</label>{/*set the counter*/}
                            <input
                                type="number"
                                id="Price"
                                name="Price"
                                className="promoInput"
                                required />
                                </div>
                        <div className="add-promo-row">
                            <label for="Size" className="promoName">Size:</label>
                            <select name="Supname" id="Name" className="dropdown" value={size} onChange={(e)=>setsize(e.target.value)}>
                                <option value="Senura Nawanjana" selected>Large</option>
                                <option value="Senura Nawanjana" selected>Medium</option>
                                <option value="Senura Nawanjana" selected>Small</option>
                                {/*Other Options will be build*/}
                            </select>
                        <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Submit</button>
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
 
export default SupOrder;