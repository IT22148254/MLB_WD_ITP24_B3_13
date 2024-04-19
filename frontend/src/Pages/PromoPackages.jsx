import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Container} from 'reactstrap'
import PromoDetails from '../Components/Membership/PromoDetails'

const PromoPackages = () => {
    const [promos, setPromos] = useState([])
    //const navigate = useNavigate();

    useEffect(() => {
        const fetchPromos = async () => {
            const response = await fetch('http://localhost:8000/PromoPackages')
            const json = await response.json()

            if (response.ok) {
                setPromos(json)
            }
            if (!response.ok) {
                console.error('error', json.error);
            }
        }

        fetchPromos()
    }, [])

    const handleAddNewPromo = () => {
        //navigate('/newpromo')
    }

    return (
        <section>
            <Container>
                <div className="title code">Promo Packages</div>
                <br />
                <div className="promo-add-search">
                    <div>
                        <button class="add-prm-btn" onClick={handleAddNewPromo}>Add New Promo Package</button>
                    </div>
                </div>
            
                <div class="prm-container">
                    {promos && promos.map((promo) => (
                        <PromoDetails key={promo.id} promo={promo} />
                    ))}
                </div>
            </Container>
        </section>
    )
}
export default PromoPackages;
