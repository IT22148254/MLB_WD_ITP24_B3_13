const Editfeedback = () => {

    return ( 
        <body>
            <section>
                <Container>
                    <div className="title">Edit your feedback</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        {/*Enter rating*/}
                        <div className="add-promo-row">
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
 
export default Editfeedback;