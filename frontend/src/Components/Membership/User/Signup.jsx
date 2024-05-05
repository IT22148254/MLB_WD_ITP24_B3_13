import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Container} from 'reactstrap'
import Swal from "sweetalert2";
import axios from "axios";
const SignUp = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [error, setError]  = useState(null)

  
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    
        // Passwords match, proceed with form submission
      const customer = {name, email, password}
  
      // const response = await fetch('http://localhost:8000/register', {
      //   method: 'POST',
      //   body: JSON.stringify(customer),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }})
  
      // const json = await response.json()
  
      //             if (!response.ok) {
      //                 setError(json.error)
      //             }
  
      //             if(response.ok){

      //                 setName('')
      //                 setEmail('')
      //                 setPassword('')
      //                 setConfirmPassword('')
      //                 setIsChecked(false)
      //                 setError(null)y

  
      //                 Swal.fire({
      //                     title: "Success",
      //                     text: "registered successfully",
      //                     icon: "success",
      //                   }).then(()=>{
      //                     console.log('new User added', json)
      //                   })
                        
      //                 {/*navigate('/promoPackages')*/}
      //         }

      try {

        const response = await axios.post("http://localhost:8000/register", customer)

        if(response.ok){
          
          Swal.fire({
              title: "Success",
              text: "registered successfully",
              icon: "success",
              }).then(()=>{
              console.log('new User added'
            )
            })

            //set all fields empty
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setIsChecked(false)
            setError(null)
            setPasswordMatch(false)
        }
        
      } catch (error) {

        console.error("Error creating User:", error);
        
      }
}


    return (
      <section>
        <Container>
        <div className="title">Sign Up</div>
        <form method="POST" className="add-promo">
          <div className="add-promo-row" onSubmit={handleSubmit}>
              <input
                type="text"
                id="Name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="promoInput"
                required />
          </div>
          <div className="add-promo-row">
              <input
                type="text"
                id="Email"
                name="Email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="promoInput"
                required />
          </div>
          <div className="add-promo-row">
              <input
                type="text"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="promoInput"
                required />
          </div>
          <div className="add-promo-row">
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                className="promoInput"
                required />
          </div>
          <div className="add-promo-row">
              <input
                type="checkbox"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirmPassword"
                value={isChecked}
                onChange={()=>setIsChecked(!isChecked)} 
                className="promoInput"
                required />
          </div>
          
          <div class="add-promo-row">
            <div className="add-promo-btns">
                                      <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Submit</button>
                                        </div>
                                    </div>
                                    {error && <div className="error">{error}</div>}
                                </div>                        
        </form>

        </Container>
      </section>
        
      );
}
 
export default SignUp;