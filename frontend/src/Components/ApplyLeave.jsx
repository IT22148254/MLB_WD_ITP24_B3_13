import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Swal from "sweetalert2";

const ApplyLeave = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reason, setReason] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const leave = {startDate, endDate, reason}

        const response = await fetch('http://localhost:8000/leaves', {
                    method: 'POST',
                    body: JSON.stringify(leave),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()
        
                if (!response.ok) {
                    setError(json.error)
                    console.log('error', error)
                }
        
                if (response.ok) {

                        setStartDate(new Date())
                        setEndDate(null)
                        setReason('')
                        setError(null)
                    
                    Swal.fire({
                        title: "Success",
                        text: "Leave added successfully",
                        icon: "success",
                      }).then(()=>{
                        console.log('new Leave added', json)
                      })

                     {/*navigate ('/promoPackages')*/}

    }
    }

    return ( 
        <body>
        <section>
            <Container>
            <div className="leftImage">
                    <img/>{/*Logo Img - add this*/}
                </div>
                <div className="title">Apply leave</div>
                <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                    <div className="add-promo-row">
                        <DatePicker
                            showIcon
                            dateFormat="dd/MM/yyyy"
                            value={startDate}
                            onChange={(date)=>setStartDate(date)}
                            className="promoInput"
                            placeholderText="Date-From"
                            selected={startDate}
                            selectsStart
                            endDate={endDate} 
                            minDate={new Date()}
                            required />
                    </div>
                    <div className="add-promo-row">
                        <DatePicker
                            showIcon
                            selected={endDate}
                            onChange={(date)=>setEndDate(date)}
                            selectsEnd
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd/MM/yyyy"
                            className="promoInput"
                            placeholderText="Date-To:"
                            required
                        />
                    </div>
                    <div className="add-promo-row">
                        <textarea cols="30" rows="5" placeholder="Enter the reason here.." className="service-text" 
                        value={reason} onChange={(e)=>setReason(e.target.value)} required></textarea>    
                    </div>
                    <div class="add-promo-row">
                                <div className="add-promo-btns">
                                    <div>
                                        <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                        <button type='submit' className='primary__btn submit create-btn'>Apply</button>
                                    </div>
                                </div>
                                {error && <div className="error">{error}</div>}
                            </div>
                </form>
            </Container>
        </section>
    </body>
     );
}
 
export default ApplyLeave;