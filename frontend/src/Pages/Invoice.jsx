import React from 'react';
import bg from "../Images/bg_main.jpg";

const Invoice = () => {

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
      };

  const invoiceData = {
    invoiceNo: 1020,
    supplierName: 'Senuja Perera',
    invoiceDate: 'May 21, 2021',
    dueDate: 'June 10, 2021',
    items: [
      { description: 'Cleaning Supplies', quantity: 1, unit: 500, price: 500, amount: 500 },
      { description: 'Life Jackets', quantity: 1, unit: 1500, price: 1500, amount: 1500 },
      { description: 'SwimWear', quantity: 2, unit: 3000, price: 6000, amount: 6000 },
    ],
    total: 8000,
  };

  return (
    <div style={bgStyle}>
            <div className="flex h-full justify-center items-center ">
                <div className="bg-black/45 w-5/8 h-auto rounded-[50px] py-12 px-14 flex flex-col gap-y-4"> 
                    <div >
                        <p className="text-4xl text-white font-bold mb-8 text-center" style={{ WebkitTextStroke: '1px black' }}>Invoice</p> 
                        <div className='text-white'>
                            <p className="mb-2">Invoice no: {invoiceData.invoiceNo}</p>
                            <p className="mb-2">Supplier Name: {invoiceData.supplierName}</p>
                            <p className="mb-2">Invoice date: {invoiceData.invoiceDate}</p>
                            <p className="mb-4">Due date: {invoiceData.dueDate}</p>
                        </div>
      <table className="w-full mb-4 border border-black">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="py-2 px-4 border border-black">Description</th>
            <th className="py-2 px-4 border border-black">Quantity</th>
            <th className="py-2 px-4 border border-black">Unit</th>
            <th className="py-2 px-4 border border-black">Price</th>
            <th className="py-2 px-4 border border-black">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="bg-blue-400 border border-black" >
              <td className="py-2 px-4 border border-black">{item.description}</td>
              <td className="py-2 px-4 border border-black">{item.quantity}</td>
              <td className="py-2 px-4 border border-black" >{item.unit}</td>
              <td className="py-2 px-4 border border-black">{item.price}</td>
              <td className="py-2 px-4 border border-black">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xl font-bold text-white text-right">Total : Rs {invoiceData.total}</p>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Invoice;