import { useState } from 'react';
import { Container } from 'reactstrap'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import bg from "../../../Images/bg.jpg";
const InstructorChange = () => {

  const [TimeSlot, setTimeSlot] = useState('')
  const [Day, setDay] = useState('')
  const [Trainer, setTrainer] = useState('')
  const [error, setError] = useState(null)
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const Instchng = { TimeSlot, Day, Trainer }

    const response = await fetch('http://localhost:8070/schedule/coachSchedule/add', {
      method: 'POST',
      body: JSON.stringify(Instchng),
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
        // window.location.reload()
        navigate('/chngtimeondytbl')
      })


    }

  }

  // const handlelist = ()=>{
  //     navigate('/chngtimeondytbl')
  // }
  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
    width: "100%"
  };


  // Get today's date in the format yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];

  return (

    <div className="flex items-center justify-center h-full" style={bgStyle}>
      <div className="bg-black/55  rounded-[50px] w-[700px] py-16 px-16 gap -inset-y-8">
        <div className="flex items-center justify-center text-xl font-normal text-white mb-14 title" style={{ fontFamily: 'poppins' }}>Change Time Slot For Oneday</div>
        <form method="POST" className="add-promo" onSubmit={handleSubmit}>
          <div className="flex items-center mb-12">
            <label htmlFor="Date" className="w-1/4 py-2 mb-0 mr-4 font-medium text-white">Date : </label>
            <input
              type="date"
              dateFormat="dd/mm/yyyy"
              id="Date"
              name="Details"
              value={Day}
              onChange={(e) => setDay(e.target.value)}
              className="w-3/4 px-3 py-2 border-2 border-blue-400 rounded-xl"
              min={today}
              required
            />
          </div>
          <div className="flex items-center mb-12">
            <label htmlFor="currentslot" className="w-1/4 py-2 mb-0 mr-4 font-medium text-white">
              Time Slot :
            </label>
            <select
              name="TimeSlot"
              id="TimeSlot"
              className="w-3/4 px-3 py-2 border-2 border-blue-400 rounded-xl"
              value={TimeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="8.30-10.30">8.30 PM - 11:30 AM</option>
              <option value="10.30-12.30">10.30 AM - 12.30 PM</option>
              <option value="1.30-3.30">1.30 AM - 3.30 PM</option>
              <option value="3.30-5.30">3.30 AM - 5.30 PM</option>
            </select>
          </div>
          <div className="flex items-center mb-12">
            <label htmlFor="Price" className="w-1/4 py-2 mb-0 mr-4 font-medium text-white">
              New Time Slot :
            </label>
            <select
              name="TimeSlot"
              id="TimeSlot"
              className="w-3/4 px-3 py-2 border-2 border-blue-400 rounded-xl"
              value={Trainer}
              onChange={(e) => setTrainer(e.target.value)}
            >
              <option value="Senura">Senura</option>
              <option value="Dinitha">Dinitha</option>
              <option value="Pubudu">Pubudu</option>
              <option value="Sahan">Sahan</option>
            </select>




          </div>
          <div className="flex justify-end mt-4 add-promo-row">
            <div className="add-promo-btns">
              {/* <button onClick={handlelist} className='px-4 py-2 font-semibold text-white bg-blue-500 rounded-md mr-[150px] secondary__btn hover:bg-blue-700'>view schedules</button> */}
              <button type='submit' className='px-4 py-2 mr-[72px] text-white bg-blue-500 rounded-md fon2t-semibold secondary__btn hover:bg-blue-700'>Submit</button>
              <button type='reset' className='px-4 py-2 mr-0 font-semibold text-white bg-red-600 rounded-md primary__btn hover:bg-red-300'>Cancel</button>

            </div>
          </div>
          {error && <div className="mt-2 text-red-500 error">{error}</div>}




        </form>
      </div>
    </div>





  );
}

export default InstructorChange;