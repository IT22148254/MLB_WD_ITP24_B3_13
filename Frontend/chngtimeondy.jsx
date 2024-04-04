import { Container } from 'reactstrap'

const ChngTimeOnDy = () => {
    
    return ( 
        <body>
            <section>
                <Container>
                    <div className="title">Schedule Daily Practice time slot</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row">
                            <label for="Date" className="promo-lbl">Date</label>
                            <input
                                type="date"
                                dateFormat="dd/MM/yyyy"
                                id="Details"
                                name="Details"
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Details" className="promo-lbl">Current time Slot</label>
                            <input
                                type="text"
                                id="Details"
                                name="Details"
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Price" className="promo-lbl">New time slot</label>
                            <select name="TimeSlot" id="TimeSlot" className="dropdown">
                                <option value="1.30 - 2.30" selected>1.30-2.30pm</option>
                                {/*Other Options will be build*/}
                            </select>
                            </div>
                        <div className="add-promo-row">
                            <label for="Size" className="promoName">Section:</label>
                            <label for="Weekday">Weekday</label>
                            <input 
                                type="radio"
                                id="Weekday"
                                />
                             <label for="Weekend">Weekend</label>
                            <input 
                                type="radio"
                                id="Weekend"
                                /> </div>
                        <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Submiy</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Cancel</button>
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
 
export default ChngTimeOnDy;