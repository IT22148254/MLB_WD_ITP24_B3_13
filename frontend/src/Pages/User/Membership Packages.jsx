import React, { useState, useEffect } from "react"
import { Container } from 'reactstrap'
import { AiOutlineSearch} from "react-icons/ai"
import StandardDetails_user from "./StandardDetails_User"
import PromoDetails_user from "../Components/PromoDetails_User"
//import PromoGraph from "../../Components/Membership/PromoGraph"


const MembershipPackages = () => {
    const [stPackages, setStPackages] = useState([])
    const [prPackages, setPrPackages] = useState([])

    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPackage, setFilteredPackage] = useState(null)
    // const [displayType, setDisplayType] = useState("standard")

    useEffect(() => {
        const fetchStandards = async () => {
            const response = await fetch('http://localhost:8000/stPackages')
            const json = await response.json()

            if (response.ok) {
                setStPackages(json)
            }

            if(!response.ok){
                console.log('Standard fetch error', json.error)
            }
        }

        fetchStandards()
    }, [])

    useEffect(() => {
        const fetchPromos = async () => {
            const response = await fetch('http://localhost:8000/PromoPackages')
            const json = await response.json()

            if (response.ok) {
                setPrPackages(json)          
            }

            if(!response.ok){
                console.log('Promo fetch error', json.error)
            }
        }

        fetchPromos()
    }, [])
      
    return (
        // <section className="form-section">
        <section>
            <Container>
                    <div>
                        <AiOutlineSearch className="icon" style={{marginRight: '10px'}}/>
                        <input type="text" className='search' 
                            style={{ width: '250px', height: '35px', color: 'black' }} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const packageToFiltered =
                                    stPackages.find((standard) =>
                                      standard.stPackageName
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                    ) ||
                                    prPackages.find((promo) =>
                                      promo.Name.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                  setFilteredPackage(packageToFiltered);
                                }
                            }}
                        />
                    </div>

                {/* {displayType === "standard" ? ( */}
                <div>
                    <div className="title">Standard Packages</div>
                    
                    <div class="std-container">
                        {stPackages && stPackages
                            .filter((standard) =>
                                standard.stPackageName.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((standard) => (
                                <StandardDetails_user 
                                    key={standard.id} 
                                    standard={standard} 
                                    filteredPackage = {filteredPackage}
                                />
                            ))
                        }
                    </div>
                </div>
                {/* ) : ( */}
                <div>
                    <div className="title code">Promo Packages</div>
              
                    <div className="promo-container">
                        {/* left side - packages */}
                        <div className="promo-left">
                            {prPackages && prPackages
                                .filter((promo) =>
                                    promo.Name.toLowerCase().includes(searchTerm.toLowerCase())
                                ) 
                                .map((promo) => (
                                    <PromoDetails_user 
                                        key={promo.id} 
                                        promo={promo}
                                        filteredPackage = {filteredPackage}
                                    />
                                ))
                            }
                        </div>
                        {/* right side - graph */}
                        {/*<div className="promo-right">
                            <div className="promo-graph">
                                <h3 className="g-title-1">Promo Package Discount Analysis</h3>
                                <h5 className="g-title-2">Discount comparing of Promo Packages</h5>
                                <br/>
                                <PromoGraph series={promoSeries} labels={promoLabels} />
                            </div>
                        </div>*/}
                    </div>
                </div>
                {/* )} */}
            </Container>
        </section>
    )
}

export default MembershipPackages;
