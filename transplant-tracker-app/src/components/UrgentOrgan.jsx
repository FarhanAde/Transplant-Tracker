import { useState, useEffect } from "react";
import { fetchUrgentOrgan } from "../api/api";
import "./UrgentOrgan.css"; // Import the CSS file

const UrgentOrgan = () => {
    const [organ, setOrgan] = useState(null);

    const fetchOrgan = async () => {
        const data = await fetchUrgentOrgan();
        setOrgan(data);
    };

    useEffect(() => {
        fetchOrgan();
        
        // Listen for urgency updates
        window.addEventListener('urgencyUpdated', fetchOrgan);
        
        return () => {
            window.removeEventListener('urgencyUpdated', fetchOrgan);
        };
    }, []);

    // Helper function to check if the transplant time is urgent
    const isUrgent = (time) => {
        if (!time || typeof time !== 'string') return false;
        return time.toLowerCase().includes('urgent');
    };

    return (
        <div className="urgent-organ-container">
            <h2 className="urgent-organ-heading">Urgent Organ</h2>
            {organ && !organ.error ? (
                <ul className="organ-details">
                    <li><strong>Organ:</strong> <span className="organ-value">{organ.organ}</span></li>
                    <li><strong>Condition:</strong> <span className="organ-value">{organ.organ_condition}</span></li>
                    <li>
                        <strong>Transplant Time:</strong> 
                        <span className={`organ-value ${isUrgent(organ.transplant_time) ? 'transplant-urgent' : ''}`}>
                            {organ.transplant_time}
                        </span>
                    </li>
                </ul>
            ) : (
                <p className="loading-message">
                    {organ?.error || "No urgent organ found"}
                </p>
            )}
        </div>
    );
};

export default UrgentOrgan;