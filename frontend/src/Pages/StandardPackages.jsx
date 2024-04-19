import React, { useEffect, useState } from "react"
import { Container } from 'reactstrap'
import StandardDetails from '../Components/Membership/Standard_Details'

const StandardPackages = () => {
    const [stPackages, setStPackages] = useState([])

    useEffect(() => {
        const fetchStandards = async () => {
            const response = await fetch('http://localhost:8000/stPackages')
            const json = await response.json()

            if (response.ok) {
                setStPackages(json)
            }

            if(!response.ok){

                console.error(json.error)
            }

            
        }

        fetchStandards()
    }, []) // [] means only fire once

    return (
        <section>
            <Container>
                <div className="title code">Standard Packages</div>
                <br />
                <div class="std-container">
                    {stPackages && stPackages.map((st) => (
                        <StandardDetails key={st._id} st={st} />
                    ))}
                </div>
            </Container>
        </section>
    )
}
export  default StandardPackages;