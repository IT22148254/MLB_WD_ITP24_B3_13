import OrderTable from '../components/Supply/Ordertable';
import bg from "../Images/bg_main.jpg";

const ReceievedOrders = () => {

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
    };


    return ( 
        
            <div className="flex h-full justify-center items-center" style={bgStyle}>
                <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 gap -inset-y-8">
                    <h1 className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }}>Recieved Orders</h1>
                    <OrderTable/>
                </div>
            </div>
           
     );
}
 
export default ReceievedOrders;