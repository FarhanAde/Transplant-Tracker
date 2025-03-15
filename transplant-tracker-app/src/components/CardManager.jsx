// import React from 'react'

import Cards from "./Cards"
import "./CardManager.css"

const CardManager = () => {
    return (
      <div className="card_manager">
        <h1>Start Exploring</h1>
        <div className="cards_container">
            <div className="cards_wrapper">
                <ul className="cards_items">
                  <Cards src="https://www.cardiacdirect.com/wp-content/uploads/2021/05/AdobeStock_306576515.jpeg" text="Some patients are on the brink of lfie and death - see who is in need of urgent care" label="Urgency" path="/#/patients/urgency"/>
                  <Cards src="https://clevelandcliniclondon.uk/-/scassets/images/org/locations/london/specialties/ortho/reconstructive-surgery-services.jpg" text="Brave donors save lives everyday, but there are still those waiting for transplants - see which organs are required the most" label="Demand" path="/#/donors/demand"/>
                </ul>
                {/* <ul className="cards_items">
                  <Cards src="/codeStockImage.jpg" text="Java Platform Game" label="Projects" path="/#/projects/java-platformer"/>
                  <Cards src="/kumonLogo.jpg" text="Maths & English Tutor at Kumon UK" label="Experience" path="/#/experience/kumon-tutor"/>
                </ul> */}
            </div>
        </div>
      </div>
    )
  }
  
  export default CardManager