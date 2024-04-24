import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container} from 'reactstrap'

const ChngTimeOndy = () => {

    const[onetimes,setOnetimes] = useState([])

    useEffect(()=>{

        const fetchOnetimes = async ()=>{

            try {
                const response =  await axios.get("http://localhost:8070/schedule/coachSchedule/")
                setOnetimes(response.data)
                
            } catch (error) {
                console.error("Failed to fetch Items", error);
            }
        }
        fetchOnetimes()
    }, [])

    const handleEdit = (id) => {
        //console.log(`Edit sup with id: ${id}`);
        //navigate(`/edit/${id}`);
      };

      const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(`http://localhost:8070/schedule/coachSchedule/${id}`);
    
              if (response.status === 200) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your Slot has been deleted.",
                  icon: "success",
                }).then(() => {
                  // Refresh the page
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Failed to delete the the slot.",
                  icon: "error",
                });
              }
            } catch (error) {
              console.error("Error deleting order:", error);
            }
          }
        });
      };

    return ( 

        <section>
            <Container>
                <div className="w-full">
                    <div className="grid grid-cols-8 bg-cyan-400">
                    <div className="border-2 border-black p-3">Day</div>
                    <div className="border-2 border-black p-3">Time Slot</div>
                    <div className="border-2 border-black p-3">Trainer</div>
                    <div className="border-2 border-black p-3">Edit</div>
                    <div className="border-2 border-black p-3">Delete</div>
                </div>
                <div
                    className="w-full overflow-auto "
                    style={{
                    maxHeight: "450px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    }}
                >
                {onetimes &&
                onetimes.map((ont, index) => (
                    <div
                    className={`grid grid-cols-8 ${
                        index % 2 == 0 ? "bg-cyan-200 " : "bg-cyan-400 "
                    }`}
                    key={ont._id}
                    >
                    <div className="border-2 border-black p-2">{ont.Day}</div>
                    <div className="border-2 border-black p-2">{ont.TimeSlot}</div>
                    <div className="border-2 border-black p-2">
                        {ont.Trainer}
                    </div>  
                    <div className="border-2 border-black p-2">
                <button
                  className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                  onClick={() => handleEdit(ont._id)}
                >
                  Edit
                </button>
              </div>
              <div className="border-2 border-black p-2">
                <button
                  className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                  onClick={() =>
                    handleDelete(ont._id)
                  }
                >
                  Delete
                </button>
              </div>
                    
                    </div>
                ))}
                </div>
            </div>
        </Container>
    </section>      
     );
}
 
export default ChngTimeOndy;