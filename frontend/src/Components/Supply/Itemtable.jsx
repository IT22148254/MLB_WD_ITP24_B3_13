import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container} from 'reactstrap'

const Itemtable = () => {

    const[items,setItems] = useState([])

    useEffect(()=>{

        const fetchItems = async ()=>{

            try {
                const response =  await axios.get(" http://localhost:8000/Items")
                setItems(response.data)
                
            } catch (error) {
                console.error("Failed to fetch Items", error);
            }
        }
        fetchItems()
    }, [])

    useEffect(() => {
        console.log("Items: ", items);
        // setData(employees);
      }, [items]);

    return ( 

        <section>
            <Container>
                <div className="w-full">
                    <div className="grid grid-cols-8 bg-cyan-400">
                    <div className="border-2 border-black p-3">Item</div>
                    <div className="border-2 border-black p-3">Quantity in Stock</div>
                    <div className="border-2 border-black p-3">Sold this month</div>
                    <div className="border-2 border-black p-3">Need to Purchase</div>
                </div>
                <div
                    className="w-full overflow-auto "
                    style={{
                    maxHeight: "450px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    }}
                >
                {items &&
                items.map((item, index) => (
                    <div
                    className={`grid grid-cols-8 ${
                        index % 2 == 0 ? "bg-cyan-200 " : "bg-cyan-400 "
                    }`}
                    key={item.id}
                    >
                    <div className="border-2 border-black p-2">{item.itemName}</div>
                    <div className="border-2 border-black p-2">{item.Qty}</div>
                    <div className="border-2 border-black p-2">
                        {item.soldThisMonth}
                    </div>  
                    <div className="border-2 border-black p-2">
                        {item.needToPurchase}
                    </div>  
                    </div>
                ))}
                </div>
            </div>
        </Container>
    </section>      
     );
}
 
export default Itemtable;