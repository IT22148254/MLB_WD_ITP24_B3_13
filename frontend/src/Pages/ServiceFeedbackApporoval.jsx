import { useEffect,useState} from 'react'
import { Container, Row, Table } from 'reactstrap'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";

function handleAccept() {
    Swal.fire({
        title: "Success",
        text: "Feedback Approved successfully",
        icon: "success",
      }).then(()=>{
        console.log('new feedback added')
      })

  }

const ServiceFeedbackApproval = () => {

    const [servicefeedbacks, setServiceFeedbacks] = useState([])
    //const navigate = useNavigate();
    //const viewInstructorFeedbackList = () => {
        //navigate(`/InstructorFeedbackApproval`);
      //}

      useEffect(() => {
        const fetchServiceFeedback = async () => {
            try {
                const response = await axios.get("http://localhost:8000/serviceFeedbacks");
                setServiceFeedbacks(response.data);
            } catch (error) {
                console.log('Error fetching service feedbacks:', error);
            }

        };
        fetchServiceFeedback();
    }, []);

    const handleServiceFeedbackReject = (id) => {
        axios.delete(`http://localhost:8000/serviceFeedbacks/${id}`)
            .then(response => {

                // Refresh the table to show updated data
                Swal.fire({
                        title: "Success",
                        text: "Feedback deleted successfully",
                        icon: "success",
                      }).then(()=>{
                        console.log('Feedback deleted successfully')
                      })

                window.location.reload();

            })
            .catch(error => {

            Swal.fire({
                        title: "Error",
                        text: "Feedback rejection failed",
                        icon: "success",
                      }).then(()=>{
                        console.log('Error deleting feedback:', error);

                      })

            });
    }
    const handleCreateReport = () => {
        // initialize the PDF document
        const doc = new jsPDF();

        // add title to the PDF document
        doc.setFontSize(16);
        doc.text('Service Feedback Report', 14, 22);
        
      
        // define the table columns
        const columns = [     
            { header: 'Customer Name', dataKey: 'custName' },    
            { header: 'Email', dataKey: 'custEmail' },    
            { header: 'Rating', dataKey: 'servicerating' },    
            { header: 'Feedback', dataKey: 'service_feedback' }  
        ];
        
        // define the table rows
        const rows = servicefeedbacks.map(servicefeedback => ({
          custName: servicefeedback.custName,
          custEmail: servicefeedback.custEmail,
          servicerating: servicefeedback.servicerating,
          service_feedback: servicefeedback.service_feedback
        }));
        
        // add the table to the PDF document
        doc.autoTable(columns, rows);
        
        // save the PDF file
        doc.save('ServiceFeedbackReport.pdf');
    }

    const viewCoachFeedbackList = ()=>{
        //navigate coach feedback
    }

    return (  
        <section>
            <Container>
                <div className="title code">Service Feedback List</div>
                <div className="Buttonsdiv">
                <button class="secondary__btn" id="inst_btn_position" onClick={()=>viewCoachFeedbackList()}>View Coach List</button>
                <button class="secondary__btn" id="btn_position" onClick={handleCreateReport}>Generate Feedback Report</button>
                
                </div>
                <br /> 
                <br />
                <Row>
                    <Table  dark striped bordered hover responsive>
                        <thead >
                            <th>
                                <center>Customer Name</center>
                            </th>
                            <th>
                                <center>Email</center>
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
                            {servicefeedbacks.map((sf) => (//map is a function which can loop through one by one
                                <tr key={sf.id}>
                                <td>{sf.custName}</td>
                                <td>{sf.custEmail}</td>
                                <td >{sf.servicerating}</td>
                                <td >{sf.service_feedback}</td>
                                <td><button className='accept_btn 'onClick={handleAccept}>Accept</button></td>
                                <td><button className='reject_btn 'onClick={() => handleServiceFeedbackReject(sf.id)}>Reject</button></td>
                            </tr>
                            ))}
                       </tbody>
                    </Table>
                </Row>
            </Container>          
            <br/>
            <br/>
            <br/>
                
        </section>

    );
}
 
export default ServiceFeedbackApproval;