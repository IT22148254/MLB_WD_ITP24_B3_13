import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Container } from 'reactstrap'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const SupplierTable = () => {

  const [suppliers, setSuppliers] = useState([])
  let navigate = useNavigate();

  useEffect(() => {

    const fetchSuppliers = async () => {

      try {
        const { data } = await axios.get("http://localhost:8070/supplier")
        setSuppliers(data.result)
        console.log(data)

      } catch (error) {
        console.error("Failed to fetch Items", error);
      }
    }
    fetchSuppliers()
  }, [])

  const handleEdit = (id) => {
    navigate(`/sup/editsup/${id}`);
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
          const response = await axios.delete(`http://localhost:8070/supplier/${id}`);

          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => {
              // Refresh the page
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the Order.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
    });
  };

  const handleCreateReport = () => {
    // initialize the PDF document
    const doc = new jsPDF();

    // add title to the PDF document
    doc.setFontSize(16);
    doc.text('Supplier Details Report', 14, 22);


    // define the table columns
    const columns = [
        { header: 'Supplier Name', dataKey: 'Name' },
        { header: 'Email', dataKey: 'Email' },
        { header: 'Phone', dataKey: 'Phone' },
        { header: 'Address', dataKey: 'Address' }
    ];

    // define the table rows
    const rows = suppliers.map(sup => ({
        Name: sup.Name,
        Email: sup.Email,
        Phone: sup.Phone,
        Address: sup.Address
    }));

    // add the table to the PDF document
    doc.autoTable(columns, rows);

    // save the PDF file
    doc.save('Supplier report.pdf');
}

  return (

    <section>
      <Container>
        <div className="w-full">
          <p className="text-4xl text-white font-bold">Suppliers</p>
          <div className="grid grid-cols-8 bg-cyan-400">
            <div className="border-2 border-black p-3">Name</div>
            <div className="border-2 border-black p-3">Email</div>
            <div className="border-2 border-black p-3">Phone</div>
            <div className="border-2 border-black p-3">Address</div>
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
            {suppliers &&
              suppliers.map((sup, index) => (
                <div
                  className={`grid grid-cols-8 ${index % 2 === 0 ? "bg-cyan-200 " : "bg-cyan-400 "
                    }`}
                  key={sup.id}
                >
                  <div className="border-2 border-black p-2">{sup.Name}</div>
                  <div className="border-2 border-black p-2">{sup.Email}</div>
                  <div className="border-2 border-black p-2">
                    {sup.Phone}
                  </div>
                  <div className="border-2 border-black p-2">
                    {sup.Address}
                  </div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleEdit(sup._id)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() =>
                        handleDelete(sup._id)
                      }
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}
          </div>
        </div>
        <button type="" className="bg-blue-500 py-3 px-8 rounded-lg text-lg font-bold hover:bg-blue-700 transition duration-300" onClick={handleCreateReport}>
          Generate Report
        </button>
      </Container>
    </section>
  );
}

export default SupplierTable;