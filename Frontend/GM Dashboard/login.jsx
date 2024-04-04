const Login = () => {
    return ( 
        <body>
            <section>
                <Container>
                <div className="leftImage">
                        <img/>{/*Logo Img - add this*/}
                    </div>
                    <div className="title">Sign In</div>
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
                                type="text"
                                id="Details"
                                name="Details"
                                className="promoInput"
                                placeholder="Password"
                                required />
                        </div>
                        <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Sign in</button>
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
 
export default Login;