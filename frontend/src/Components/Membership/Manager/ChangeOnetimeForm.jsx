import { useState } from 'react';
import { Container } from 'reactstrap'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import bg from "../../../Images/package_bg.jpg";
const ChangeTimeOnDayForm = () => {

    const [TimeSlot, setTimeSlot] = useState('')
    const [Day, setDay] = useState('')
    const [Trainer, setTrainer] = useState('')
    const [error, setError] = useState(null)
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const chngTimeOndy = { TimeSlot, Day, Trainer }

        const response = await fetch('http://localhost:8070/schedule/coachSchedule/add', {
            method: 'POST',
            body: JSON.stringify(chngTimeOndy),
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

            setDay('')
            setTimeSlot('')
            setTrainer('')
            setError(null)

            Swal.fire({
                title: "Success",
                text: "new slot added successfully",
                icon: "success",
            }).then(() => {
                console.log('new slot added', json)
                window.location.reload()
            })

            
        }

    }

    const handlelist = ()=>{
        navigate('/chngtimeondytbl')
    }
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
      };
   
    
      // Get today's date in the format yyyy-mm-dd
      const today = new Date().toISOString().split('T')[0];

    return (
        
                <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-4/5 rounded-[50px] py-12 px-12 gap -inset-y-8">
                <div className="flex h-full justify-center items-center" style={bgStyle}>
      <div className="bg-black/45 w-4/5 rounded-[50px] py-12 px-12 gap -inset-y-8">
                    <div className=" text-white title text-xl font-bold mb-4">Change Time Slot For Oneday</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="Date" className="promo-lbl block font-medium mb-1">Date</label>
                            <input type="date" dateFormat="dd/MM/yyyy" id="Date" name="Details" value={Day} onChange={(e)=>setDay(e.target.value)} className="promoInput border border-gray-300 rounded-md px-3 py-2 w-full" min={today}  required />
                        </div>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="currentslot" className="promo-lbl block font-medium mb-1">Time Slot</label>
                            <select name="TimeSlot" id="TimeSlot" className="dropdown border border-gray-300 rounded-md px-3 py-2 w-full" value={TimeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                                <option value="8.30-10.30"  >8.30 - 11:30 AM</option>
                                <option value="10.30-12.30">10.30 AM - 12.30 PM</option>
                                <option value="1.30-3.30">1.30 - 3.30 PM</option>
                                <option value="3.30-5.30">3.30 - 5.30 PM</option>
                            </select>
                        </div>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="Price" className="promo-lbl block font-medium mb-1">New Time Slot</label>
                            <select name="TimeSlot" id="TimeSlot" className="dropdown border border-gray-300 rounded-md px-3 py-2 w-full" value={Trainer} onChange={(e) => setTrainer(e.target.value)}>
                                <option value="Senura" >Senura </option>
                                <option value="Dinitha">Dinitha</option>
                                <option value="Pubudu">Pubudu</option>
                                <option value="Sahan">Sahan</option>
                            </select>
                        </div>
                        <div className="add-promo-row flex justify-end mt-4">
                            <div className="add-promo-btns">
                                <button type='submit' className='secondary__btn mr-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md'>Submit</button>
                                <button type='reset' className='primary__btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md'>Cancel</button>
                            </div>
                        </div>
                        {error && <div className="error text-red-500 mt-2">{error}</div>}
                        <button onClick={handlelist} className='secondary__btn mr-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md'>view schedules</button>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>

    );
}

export default ChangeTimeOnDayForm;