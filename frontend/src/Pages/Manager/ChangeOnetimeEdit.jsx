import { useParams } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container} from 'reactstrap'
const ChangeOnetimeEdit = () => {

    const [TimeSlot, setTimeSlot] = useState('')
    const [Day, setDay] = useState('')
    const [Trainer, setTrainer] = useState('')
    const [error, setError] = useState(null)

    const {id} = useParams();

    useEffect(() => {
        const fetchonetimes = async () => {
            try {
                const result = await axios.get(`http://localhost:8070/package/propackage/get/${id}`);
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

        axios.put(`http://localhost:8070/package/propackage/${id}`, {
            TimeSlot: TimeSlot,
            Day: Day,
            Trainer: Trainer,
        })
            .then(response => {
                Swal.fire({
                    title: "Success",
                    text: " promo updated successfully",
                    icon: "success",
                }).then(() => {
                    console.log('promo updated successfully', response.data)
                })
                //window.location = "http://localhost:3000/standardpackages";
            })
            .catch(error => {

                Swal.fire({
                    title: "Error",
                    text: " Cannot update Promo",
                    icon: "error",
                }).then(() => {
                    console.log('Cannot update Promo', error)
                })


            });
    };

    return ( 
        <body>
            <section>
                <Container>
                    <div className="title text-xl font-bold mb-4">Change Time Slot For Oneday</div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="Date" className="promo-lbl block font-medium mb-1">Date</label>
                            <input type="date" dateFormat="dd/MM/yyyy" id="Date" name="Details" value={Day} onChange={(e) => setDay(e.target.value)} className="promoInput border border-gray-300 rounded-md px-3 py-2 w-full" required />
                        </div>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="currentslot" className="promo-lbl block font-medium mb-1">Time Slot</label>
                            <select name="TimeSlot" id="TimeSlot" className="dropdown border border-gray-300 rounded-md px-3 py-2 w-full" value={TimeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                                <option value="8.30-10.30" selected>8.30 - 11:30 AM</option>
                                <option value="10.30-12.30">10.30 AM - 12.30 PM</option>
                                <option value="1.30-3.30">1.30 - 3.30 PM</option>
                                <option value="3.30-5.30">3.30 - 5.30 PM</option>
                            </select>
                        </div>
                        <div className="add-promo-row mb-2">
                            <label htmlFor="Price" className="promo-lbl block font-medium mb-1">New Time Slot</label>
                            <select name="TimeSlot" id="TimeSlot" className="dropdown border border-gray-300 rounded-md px-3 py-2 w-full" value={Trainer} onChange={(e) => setTrainer(e.target.value)}>
                                <option value="1.30-2.30">Senura </option>
                                <option value="2.30-3.30">Dinitha</option>
                                <option value="3.30-4.30">Pubudu</option>
                                <option value="4.30-5.30">Sahan</option>
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
                </Container>
            </section>
        </body>
     );
}
 
export default ChangeOnetimeEdit;