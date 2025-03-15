import { useState, useEffect } from "react";
import { fetchUrgentPatient } from "../api/api";
import "./UrgentPatient.css"; // Import the CSS file

const UrgentPatient = () => {
    const [patient, setPatient] = useState(null);

    const fetchPatient = async () => {
        const data = await fetchUrgentPatient();
        setPatient(data);
    };

    useEffect(() => {
        fetchPatient();
        
        // Listen for urgency updates
        window.addEventListener('urgencyUpdated', fetchPatient);
        
        return () => {
            window.removeEventListener('urgencyUpdated', fetchPatient);
        };
    }, []);

    return (
        <div className="urgent-patient-container">
            <h2 className="urgent-patient-heading">Urgent Patient</h2>
            {patient && !patient.error ? (
                <ul className="patient-details">
                    <li><strong>Name:</strong> <span className="patient-value">{patient.name}</span></li>
                    <li><strong>Condition:</strong> <span className="patient-value">{patient.health_condition}</span></li>
                    <li><strong>Hospital:</strong> <span className="patient-value">{patient.hospital_location}</span></li>
                </ul>
            ) : (
                <p className="loading-message">
                    {patient?.error || "No urgent patient found"}
                </p>
            )}
        </div>
    );
};

export default UrgentPatient;