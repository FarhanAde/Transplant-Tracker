import { useState, useEffect } from "react";
import { fetchAllPatients } from "../api/api.jsx";
import "./RecipientList.css";

const RecipientList = () => {
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getRecipients() {
            try {
                const data = await fetchAllPatients();
                console.log("Recipient data:", data);
                setRecipients(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching recipients:", err);
                setError("Failed to load recipients");
                setLoading(false);
            }
        }
        getRecipients();
    }, []);

    if (loading) return (
        <div className="recipient-list-container">
            <h2 className="recipient-list-heading">Recipient List</h2>
            <p>Loading recipients...</p>
        </div>
    );
    
    if (error) return (
        <div className="recipient-list-container">
            <h2 className="recipient-list-heading">Recipient List</h2>
            <p>{error}</p>
        </div>
    );

    return (
        <div className="recipient-list-container">
            <h2 className="recipient-list-heading">Recipient List</h2>
            <ul className="recipient-list">
                {recipients.map((recipient) => (
                    <li key={recipient.patient_id} className="recipient-item">
                        <div className="recipient-header">
                            <span className="recipient-id">Patient #{recipient.patient_id}</span>
                            <span className="recipient-gender">{recipient.gender}, {recipient.age}</span>
                        </div>
                        <div className="recipient-details">
                            <div className="recipient-detail">
                                <span className="detail-label">Blood Type:</span>
                                <span className="detail-value">{recipient.blood_type}</span>
                            </div>
                            <div className="recipient-detail">
                                <span className="detail-label">Condition:</span>
                                <span className="detail-value recipient-condition">{recipient.health_conditions}</span>
                            </div>
                            {recipient.prescriptions && (
                                <div className="recipient-detail">
                                    <span className="detail-label">Medications:</span>
                                    <span className="detail-value">{recipient.prescriptions}</span>
                                </div>
                            )}
                            <div className="recipient-detail recipient-hospital">
                                <span className="detail-label">Hospital:</span>
                                <span className="detail-value">{recipient.hospital_location}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipientList;