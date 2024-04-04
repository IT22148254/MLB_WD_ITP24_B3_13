import { Container } from 'reactstrap'

const DailySchedule = () => {

    return (  
        <body>
            <section>
                <Container>
                    <div className="title">Schedule Daily Practice time slot</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row">
                            <label for="Name" className="promo-lbl">Payment Name:</label>
                            <input
                                type="text"
                                id="Details"
                                name="Details"
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Details" className="promo-lbl">Payment Time Slot:</label>
                            <input
                                type="text"
                                id="Details"
                                name="Details"
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Price" className="promo-lbl">Select the Trainer:</label>
                            <input
                                type="number"
                                id="Price"
                                name="Price"
                                className="promoInput"
                                required />
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
                                />
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
 
export default DailySchedule;