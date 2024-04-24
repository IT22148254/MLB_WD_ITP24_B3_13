import { useEffect, useState } from "react";
import { Container } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import bg from "../../../Images/package_bg.jpg";

const EmailForm = () => {
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState(null)

    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const email = { title, subject, content }


        const response = await fetch('http://localhost:8070/email/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email)
        })


        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setTitle("")
            setSubject('')
            setContent('')
            setError(null)
            alert('New email created')
            console.log('new email created!', json)
            navigate('/emailtable')
        }
    }



    return (
        <section>
            <Container>
            <div>
            <div className="flex h-full justify-center items-center ">
                <div className="bg-black/45 w-1/2 rounded-[50px] py-12 px-14 flex flex-col gap-y-8">
                    <p className="text-4xl text-white font-bold align-top mb-8" style={{ WebkitTextStroke: '1px black' }} >Add Email</p>
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
                                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Save</button>
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


export default EmailForm;