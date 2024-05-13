import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import Swal from "sweetalert2";

const ContactUs = () => {

    const [inqName,setInqName] = useState('')
    const [inqEmail,setInqEmail] = useState('')
    const [inqDesc, setInqDesc] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async ()=>{

        const Inquiry = {inqName, inqName, inqDesc}

        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify(Inquiry),
            headers :{
                'Content-Type':'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            console.log('error', error)
        }

        if(response.ok){
            setInqName('')
            setInqEmail('')
            setInqDesc('')
            setError(null)

            Swal.fire({
                title: "Success",
                text: "Inquiry added successfully",
                icon: "success",
              }).then(()=>{
                console.log('new inquiry added', json)
              })
            
        }

    }

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
                                value={inqName}
                                onChange={(e)=>setInqName(e.target.value)}
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Email" className="promo-lbl">Email Address:</label>
                            <input
                                type="Email"
                                id="Email"
                                name="Email"
                                value={inqEmail}
                                onChange={(e)=>setInqEmail(e.target.value)}
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="inquiry" className="promoName">Inquiry:</label>
                            <textarea id="inquiry" name="inquiry" value={inqDesc} onChange={(e)=>setInqDesc(e.target.value)}></textarea>
                        <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Create</button>
                                        </div>
                                    </div>
                                    {error && <div>{error}</div>}
                                </div>
                        </div>
                    </form>
                </Container>
            </section>
        </body>

     );
}
 
export default ContactUs;