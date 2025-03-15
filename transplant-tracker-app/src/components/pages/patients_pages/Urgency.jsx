// import React from 'react'
import "../../../App.css"
import OrganIdFetcher from "../../OrganIDFetcher"
import UrgentOrgan from "../../UrgentOrgan"
import UrgentPatient from "../../UrgentPatient"

const Urgency = () => {
  return (
    <div>
      <h1 className="urgency">URGENCY</h1>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 15px'
      }}>
        <OrganIdFetcher/>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '15px',
          margin: '15px 0'
        }}>
          <UrgentPatient/>
          <UrgentOrgan/>
        </div>
      </div>
    </div>
  )
}

export default Urgency