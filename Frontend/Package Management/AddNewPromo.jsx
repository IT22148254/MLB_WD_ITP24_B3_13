import { useState } from "react"
import { Container } from 'reactstrap'
import { useNavigate } from "react-router-dom"
const AddNewPromo = () => {

    const [prPackageId, setPromoId] = useState('')
    const [prPackageName, setPromoName] = useState('')
    const [prPackagePrice, setPromoPrice] = useState('')
    const [prPackageDescription, setPromoDetails] = useState('')
    const [prPackageValidity, setPromoValidity] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const promo = {prPackageId, prPackageName, prPackagePrice, prPackageDescription, prPackageValidity}

        const response = await fetch('/api/prPackages', {
            method: 'POST',
            body: JSON.stringify(promo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setPromoId('')
            setPromoName('')
            setPromoPrice('')
            setPromoDetails('')
            setPromoValidity('')
            setError(null)
            console.log('new promo added', json)
            alert('New promo package created successfully!')
            navigate('/promoPackages')
        }
    } 
    
    return ( 
        <body>
            <section>
                <Container>
                    <div className="title">New Promotion Package Creation</div>
                    <div className="leftImage">
                        <img/>{/*left side Image - add this*/}
                    </div>
                    <form method="POST" className="add-promo" onSubmit={handleSubmit}>
                        <div className="add-promo-row">
                            <label for="Name" className="promo-lbl">Package Name:</label>
                            <input
                                type="text"
                                id="Name"
                                name="name"
                                value={prPackageName}
                                onChange={(e)=>
                                    setPromoName(e.target.value)
                                }
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Details" className="promo-lbl">Package Details:</label>
                            <input
                                type="text"
                                id="Details"
                                name="Details"
                                value={prPackageDescription}
                                onChange={(e)=>
                                    setPromoDetails(e.target.value)
                                }
                                className="promoInput"
                                required />
                        </div>
                        <div className="add-promo-row">
                            <label for="Price" className="promo-lbl">Package Price:</label>
                            <input
                                type="text"
                                id="Price"
                                name="Price"
                                className="promoInput"
                                placeholder="LKR"
                                value={prPackagePrice}                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                onChange={(e)=>setPromoPrice(e.target.value)}
                                required />
                        </div>
                        <div class="add-promo-row">
                                    <label for="promoPrice" className="add-promo-label">Package Price :</label>
                                    <input 
                                        type="text" 
                                        className="add-promo-input"
                                        name='price'
                                        onChange={(e) => setPromoPrice(e.target.value)}
                                        value={prPackagePrice}
                                        required
                                    />
                                </div>
                                <div class="add-promo-row">
                                    <label for="promoValidity" className="add-promo-label">Package Validity  :</label>
                                    <input
                                        type="date" 
                                        className="add-promo-input"
                                        name="validity"
                                        selected={prPackageValidity} 
                                        onChange={(e) => setPromoValidity(e.target.value)}
                                        value={prPackageValidity}
                                        dateFormat="dd/MM/yyyy"
                                        required
                                    />
                                </div>
                                <div class="add-promo-row">
                                    <div className="add-promo-btns">
                                        <div>
                                            <button type='reset' className='secondary__btn' style={{marginRight: '10px'}}>Cancel</button>
                                            {/* <button type='submit' className='primary__btn submit create-btn'>Create</button> */}
                                            <button type='submit' className='primary__btn'>Create</button>
                                        </div>
                                    </div>
                                    {error && <div className="error">{error}</div>}
                                </div>
                    </form>
                </Container>
            </section>
        </body>
     );
}
 
export default AddNewPromo;