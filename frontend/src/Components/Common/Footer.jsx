import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Icons from 'react-bootstrap-icons'
import './Footer.css'
<<<<<<< HEAD
//import logo from '../../Images/logo.png'
=======
import logo from '../../Images/logo.png'
>>>>>>> origin/chathumi
const Footer = () => {

    const logoStyle ={
        fontFamily:"Just Me Again Down Here",
        fontSize:"60px",
    }
    return ( 

<footer className="small text-white pt-4">

    {/*Icons of social media icons and links*/}
   <div className="container text-center mb-4" id="social-media-title" >
        Connect With Us :
        <a href="https://www.facebook.com/"><Icons.Facebook className='icons'/></a>
        <a href="https://www.instagram.com/"><Icons.Instagram className='icons'/></a>
        <a href="https://www.twitter.com/"><Icons.Twitter className='icons'/></a>
    </div>
    {/*Icons of social media icons and links*/}

    <hr className="clearfix w-80 d-md-none pb-0" />

    <div className="container text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
<<<<<<< HEAD
                <img alt="Logo" width={98} height={64}/>
=======
                <img src={logo} alt="Logo" width={98} height={64}/>
>>>>>>> origin/chathumi
                <p style={logoStyle}>WaveSync</p>
                <p style={{fontSize:"18px"}}>Dive into Excellence with WaveSync</p>
            </div>

            <hr className="clearfix w-80 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase"><b>Useful Links</b></h5>
                <ul className="list-unstyled">
                    <li><a href="/#">Sign In</a></li>
                    <li><a href="#">Sign Up</a></li>
                    <li><a href="#!">Packages</a></li>
                    <li><a href="#!">Feedback</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase"><b>Club Management</b></h5>
                <ul className="list-unstyled">
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Manager Login</a></li>
                    <li><a href="#!">Employee Login</a></li>
                    <li><a href="#!">Help</a></li>
                </ul>
            </div>
        </div>
    </div>


    <hr className="container" />
    <div className="footer-copyright text-center py-3">© 2024 Copyright :
        <a href="#!"> Team WaveSync</a>
    </div>

</footer>
     );
}
 
export default Footer;