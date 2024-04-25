import { useParams } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container} from 'reactstrap'
import { useState, useEffect } from "react";
import bg from "../../../Images/package_bg.jpg";
const ChangeOnetimeEdit = () => {
    

    const [TimeSlot, setTimeSlot] = useState('')
    const [Day, setDay] = useState('')
    const [Trainer, setTrainer] = useState('')
    const [error, setError] = useState(null)

    const {id} = useParams();

    useEffect(() => {
        const fetchonetimes = async () => {
            try {
                const result = await axios.get(`http://localhost:8070/schedule/coachSchedule/get/${id}`);
                setTimeSlot(result.TimeSlot);
                setDay(result.Day);
                setTrainer(result.Trainer);
                console.log(result);
            } catch (error) {
                setError(error);
                console.log('Error fetching package: ', error);
            }
        };
        fetchonetimes();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()

        const scheduleDate = {
            TimeSlot: TimeSlot,
            Day: Day,
            Trainer: Trainer,
        }

        axios.put(`http://localhost:8070/schedule/coachSchedule/${id}`, scheduleDate)
            .then(response => {
                Swal.fire({
                    title: "Success",
                    text: " schedule updated successfully",
                    icon: "success",
                }).then(() => {
                    console.log('promo updated successfully', response.data)
                })
                //window.location = "http://localhost:3000/standardpackages";
            })
            .catch(error => {

                Swal.fire({
                    title: "Error",
                    text: " schedule update Promo",
                    icon: "error",
                }).then(() => {
                    console.log('Cannot update Promo', error)
                })


            });
    };
    
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
      };

    return ( 
       
        <div className="flex h-full justify-center items-center" style={bgStyle}>
        <div className="bg-black/45 w-4/5 rounded-[50px] py-12 px-12 gap -inset-y-8">
                    <div className=" text-white title text-xl font-bold mb-4">Change Time Slot For Oneday</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="Date" className="promo-lbl block font-medium mb-1">Date</label>
                            <input type="date" dateFormat="dd/MM/yyyy" id="Date" name="Details" value={Day} onChange={(e) => setDay(e.target.value)} className="promoInput border border-gray-300 rounded-md px-3 py-2 w-full" required />
                        </div>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="currentslot" className="promo-lbl block font-medium mb-1">Time Slot</label>
                            <select name="TimeSlot" id="TimeSlot" className="dropdown border border-gray-300 rounded-md px-3 py-2 w-full" value={TimeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                                <option value="8.30-10.30" selected disabled>8.30 - 11:30 AM</option>
                                <option value="10.30-12.30">10.30 AM - 12.30 PM</option>
                                <option value="1.30-3.30">1.30 - 3.30 PM</option>
                                <option value="3.30-5.30">3.30 - 5.30 PM</option>
                            </select>
                        </div>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="Price" className="promo-lbl block font-medium mb-1">New Time Slot</label>
                            <select name="TimeSlot" id="TimeSlot" className="dropdown border border-gray-300 rounded-md px-3 py-2 w-full" value={Trainer} onChange={(e) => setTrainer(e.target.value)}>
                                <option value="Senura" selected >Senura </option>
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
                    </form>
                    </div>
                    </div>
               
       
     );
}
 
export default ChangeOnetimeEdit;