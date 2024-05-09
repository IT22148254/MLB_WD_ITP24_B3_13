import { useEffect,useState,useRef } from 'react'
import { Container, Row, Table } from 'reactstrap'
import axios from "axios"
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function handleAccept() {
    toast.success('Feedback Accepted');
    console.log("feedback accepted")
  }

const CoachFeedbackApproval = () => {

    const ref = useRef(null);
    const [coachfeedbacks, setCoachFeedbacks] = useState([]);

    
    useEffect(() => {
        const fetchCoachFeedback = async () => {
            try {
                const response = await axios.get("http://localhost:8000/coachFeedbacks");
                setCoachFeedbacks(response.data);
            } catch (error) {
                console.log('Error fetching instructor feedbacks:', error);
            }

        };
        fetchCoachFeedback();
    }, []);

   

    const handleInstructorFeedbackDelete = (id) => {
        // Delete the instructor feedback with the given id
        
        axios.delete(`http://localhost:8000/coachFeedbacks/${id}`)
            .then((response) => {

                Swal.fire({
                    title: "Success",
                    text: "Feedback deleted successfully",
                    icon: "success",
                  }).then(()=>{
                    console.log('feedback deleted successfully')
                  })
                // Refresh the table to show updated data
                window.location.reload();

            })
            .catch(error => {

                console.log('Error deleting feedback:', error);

            });
    }
    const handleGeneratePdf = () => {
        // initialize the PDF document
        const doc = new jsPDF();

        // add title to the PDF document
        doc.setFontSize(16);
        doc.text('Coach Feedback Report',14, 22)
        
      
        // define the table columns
        const columns = [    
            { header: 'Customer Name', dataKey: 'UserName' },    
            { header: 'Email', dataKey: 'Email' },
            { header: 'Coach Name', dataKey: 'Coach' },    
            { header: 'Rating', dataKey: 'Rating' },    
            { header: 'Feedback', dataKey: 'coachfeedback' }  
        ];
        
        // define the table rows
        const rows = coachfeedbacks.map(coachfeedback => ({
    
          UserName: coachfeedback.UserName,
          Email: coachfeedback.Email,
          Coach: coachfeedback.Coach,
          Rating: coachfeedback.Rating,
          coachfeedback: coachfeedback.coachfeedback
        }));
        
        // add the table to the PDF document
        doc.autoTable(columns, rows);
        
        // save the PDF file
        doc.save('CoachFeedbackReport.pdf');
    }
function handleClick() {
    Swal.fire({
        title: "Success",
        text: "Feedback accepted successfully",
        icon: "success",
      }).then(()=>{
        console.log('feedback accepted')
      })
  }


    return (  
        <section ref={ref}>
           
           
                <Container>
                <div className="title code">S</div>
                {/*Service feedback button - leave it for me*/}
                <button class="secondary__btn" id="btn_position" onClick={handleGeneratePdf}>Generate Feedback Report</button>
                <br />
                
                <br />
                <Row>
                    <Table dark striped bordered hover responsive>
                        <thead >
                            <th>
                                <center>Date</center>
                            </th>
                            <th>
                                <center>Customer Name</center>
                            </th>
                            <th>
                                <center>Email</center>
                            </th>
                            <th>
                                <center>Instructor Name</center>
                            </th>
                            <th>
                                <center>Rating</center>
                            </th>
                            <th>
                                <center>Feedback</center>
                            </th>
                            <th>
                                <center>Approve</center>
                            </th>
                            <th>
                                <center>Reject</center>
                            </th>
                        </thead>
                        <tbody>
                            {coachfeedbacks.map((row) => (
                                <tr key={row.id}>
                                <td>{row.UserName}</td>
                                <td>{row.Email}</td>
                                <td >{row.Coach}</td>
                                <td >{row.Rating}</td>
                                <td >{row.coachfeedback}</td>
                                <td><button className='accept_btn 'onClick={handleAccept}>Accept</button></td>
                                <td><button className='reject_btn ' onClick={() => handleInstructorFeedbackDelete(row.id)}>Reject</button></td>
                            </tr>
                            ))}
                            
                            

                        </tbody>
                    </Table>
                </Row>
            </Container>
            <br/>
            <br/>
            <br/>
            <br/>
            
           
                
        </section>
    );
}
 
export default CoachFeedbackApproval;