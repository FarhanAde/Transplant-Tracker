// import React from 'react'
import "../../../App.css"
import RecipientList from "../../RecipientList.jsx"
import { addTestData } from "../../../api/api.jsx"
import { useState } from "react"

const PatientRecords = () => {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddTestData = async () => {
    setIsLoading(true)
    setMessage("")
    try {
      const result = await addTestData()
      if (result.error) {
        setMessage(`Error: ${result.error}`)
      } else {
        setMessage("Test data added successfully!")
        // Refresh the recipient list
        window.location.reload()
      }
    } catch (error) {
      setMessage(`Error: ${error.message || "Failed to connect to server"}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className="patient-records">PATIENT RECORDS</h1>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        margin: '10px 0'
      }}>
        <button 
          onClick={handleAddTestData}
          disabled={isLoading}
          style={{
            padding: "8px 16px",
            margin: "10px",
            backgroundColor: isLoading ? "#cccccc" : "#0d706b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontSize: "14px"
          }}
        >
          {isLoading ? "Adding Test Data..." : "Add Test Data"}
        </button>
        {message && (
          <div style={{
            color: message.includes("Error") ? "red" : "green",
            margin: "5px",
            padding: "8px",
            backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e9",
            borderRadius: "5px",
            maxWidth: "600px",
            textAlign: "center",
            fontSize: "14px"
          }}>
            {message}
          </div>
        )}
      </div>
      <RecipientList/>
    </div>
  )
}

export default PatientRecords