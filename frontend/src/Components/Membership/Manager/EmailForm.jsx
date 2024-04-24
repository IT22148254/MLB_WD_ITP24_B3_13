import { useEffect, useState } from "react";
import { Container} from 'reactstrap'

const EmailForm = () => {
    const [title, setTitle] = useState('')
    const [subject,  setSubject] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e)=>{

        e.preventDefault();

        const email = {title, subject, content}

        useEffect(()=>{

            const setEmail = async ()=>{

                const response = await fetch('', {
                    method:'POST',
                    headers:{'Content-Type':'application/json' },
                    body:JSON.stringify(email)
                })
            

            const json = await response.json()
            if(!response.ok){
                setError(json.error)
            }

            if(response.ok){
                setTitle("")
                setSubject('')
                setContent('')
                setError(null)
                alert('New email created')
                console.log('new email created!', json)
            }

            setEmail()
        }
    }, [])

    
    
    return (  
        <section>
            <Container>
                <form action="" className="addpromo" onSubmit={handleSubmit}> 
                <div className="add-promo-row">
                            <input
                                type="email"
                                id="Name"
                                name="Email"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                className="promoInput"
                                placeholder="Title"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="promoInput"
                                placeholder="Subject"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Content"></textarea>
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
                </form>
            </Container>
        </section>
    );
}
}
 
export default EmailForm;