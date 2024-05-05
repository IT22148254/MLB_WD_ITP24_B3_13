import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import bg from "../../../Images/package_bg.jpg";


const EmailTable = () => {
  // const bgStyle = {
  //   backgroundImage: `url(${bg})`, 
  //   backgroundSize: "cover",
  //   height: "100%",
    
  // };

  const [emails, setEmails] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredEmails, setFilteredEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = filterEmails(emails, searchInput);
    setFilteredEmails(filtered);
  }, [searchInput, emails]);

  const filterEmails = (emails, searchText) => {
    return emails.filter((email) =>
      email.title.toLowerCase().startsWith(searchText.toLowerCase())
    );
  };


  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res= await axios.get('http://localhost:8070/email/');
        setEmails(res.data);
        console.log(res)
      } catch (error) {
        console.error('Failed to fetch Suppliers', error);
      }
    };
    fetchEmails();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editemail/${id}`);
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
          const response = await axios.delete(
            `http://localhost:8070/email/${id}`
          );

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
              text: "Failed to delete the feedback.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting feeddback:", error);
        }
      }
    });
  };
  const handleCreateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Email Details Report', 14, 22);

    const columns = [
      { header: 'Title', dataKey: 'title' },
      { header: 'Subject', dataKey: 'subject' },
      { header: 'Content', dataKey: 'content' },
    ];

    const rows = emails.map((em) => ({
      title: em.title,
      subject: em.subject,
      content: em.content,
    }));

    doc.autoTable(columns, rows);
    doc.save('Email Report.pdf');
  };

  return (
   
      <div
        className="h-screen flex justify-center items-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
    
      <div className="flex flex-col justify-center items-center h-screen mt-10 mb-10">
        <div className="bg-black/45 h-auto w-4/5 rounded-[50px] py-12 px-14 gap -inset-y-8">
          <p className="text-4xl text-white font-bold mb-4">Emails Table</p>
          <div className="mb-4">
            <div className="h-9 bg-white/70 w-1/2 rounded-lg">
              <input
                placeholder="Search by Name"
                className="bg-transparent pl-4 placeholder:text-gray-600 w-full h-full border-none active:border-none focus:border-none focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 bg-cyan-400 text-white">
            <div className="border-2 border-black p-3">Title</div>
            <div className="border-2 border-black p-3 ">Subject</div>
            <div className="border-2 border-black p-3">Content</div>
            <div className="border-2 border-black p-3">Edit</div>
            <div className="border-2 border-black p-3">Delete</div>
          </div>
          <div
            className="w-full overflow-auto"
            style={{ maxHeight: '450px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredEmails&&
              filteredEmails.map((em, index) => (
                <div
                  className={`grid grid-cols-5 ${index % 2 === 0 ? 'bg-cyan-200' : 'bg-cyan-400'}`}
                  key={em._id}
                >
                  <div className="border-2 border-black p-2 text-black">{em.title}</div>
                  <div className="border-2 border-black p-2 text-black ">{em.subject}</div>
                  <div className="border-2 border-black p-2 text-black">{em.content}</div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-cyan-400 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleEdit(em._id)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="border-2 border-black p-2">
                    <button
                      className="bg-red-500 border-2 border-black rounded-full p-1 px-4 text-white font-bold"
                      onClick={() => handleDelete(em._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleCreateReport}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default EmailTable;