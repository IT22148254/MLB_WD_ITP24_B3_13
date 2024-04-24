import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Container } from 'reactstrap'
import Swal from "sweetalert2"
import bg from "../../../Images/package_bg.jpg";
const EditEmail = () => {
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState(null)
    const {id} = useParams();

    useEffect(() => {
        const Fetchemails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/email/get/${id}`);
                const { data } = response; // Destructure the data property
                setTitle(data.title);
                setSubject(data.subject);
                setContent(data.content);
                console.log(response);
            } catch (error) {
                setError(error);
                console.log('Error fetching package: ', error);
            }
        };
        Fetchemails();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put(`localhost:8070/email/${id}`, {
            title: title,
            subject: subject,
            content: content,
        })
            .then(response => {
                Swal.fire({
                    title: "Success",
                    text: " Email updated successfully",
                    icon: "success",
                }).then(() => {
                    console.log('promo updated successfully', response.data)
                })
                //window.location = "http://localhost:3000/standardpackages";
            })
            .catch(error => {

                Swal.fire({
                    title: "Error",
                    text: " Cannot update Email",
                    icon: "error",
                }).then(() => {
                    console.log('Cannot update Promo', error)
                })


            });
    };

    return (  
        <section>
        <Container>
        <div>
        <div className="flex h-full justify-center items-center ">
            <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 flex flex-col gap-y-8">
                <p className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Update Email</p>
            <form  className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        id="Name"
                        name="Email"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                        pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                        placeholder="Title"
                        required />
                </div>
                <div className="add-promo-row">
                    <input
                        type="text"
                        id="subject"
                        name="password"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-3/5 bg-white/70 h-14 rounded-xl placeholder:text-black placeholder:font-semibold placeholder:text-lg 
                        pl-5 text-xl border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                        placeholder="Subject"
                        required />
                </div>
                <div className="add-promo-row">
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="w-full max-w-full min-w-full"></textarea>
                </div>
                <div class="add-promo-row">
                    <div className="add-promo-btns">
                        <div>
                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                            <button type='submit' className='primary__btn'>Save</button>
                        </div>
                    </div>
                    {error && <div className="error">{error}</div>}
                </div>
                </div>
            </form>
            </div>
            </div>
            </div>
        </Container>
    </section>
    );
}
 
export default EditEmail;