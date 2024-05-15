import React from 'react';
import emailjs from 'emailjs-com';

export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

    emailjs.sendForm('service_b27z6pc', 'template_9y1j719', e.target, 'zywfAzWm1IL9W5-Mp')
      .then((result) => {
          window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      
      <label>Status</label>
      <input type="text" name="from_status" />
      <label>Email</label>
      <input type="email" name="from_email" />
      
    
      <input type="submit" value="Send" />
    </form>
  );
}