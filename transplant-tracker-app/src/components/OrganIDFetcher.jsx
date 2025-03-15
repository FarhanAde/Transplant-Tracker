import { useState } from "react";
import { fetchOrganId, addTestOrgans, calculateUrgency } from "../api/api";
import "./OrganIDFetcher.css"; // Import the CSS file

const OrganIdFetcher = () => {
    const [inputId, setInputId] = useState("");
    const [organId, setOrganId] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFetchOrganId = async () => {
        if (!inputId) {
            setError("Please enter an organ ID.");
            return;
        }
        setError("");
        setMessage("");
        setIsLoading(true);
        
        try {
            const data = await fetchOrganId(inputId);
            if (data.error) {
                setError(data.error);
                setOrganId(null);
            } else {
                setOrganId(data);
                // Calculate urgency after fetching organ
                const urgencyResult = await calculateUrgency(inputId);
                if (urgencyResult.error) {
                    setError(urgencyResult.error);
                } else {
                    setMessage(`Urgency calculated successfully - ${urgencyResult.organ} matched with ${urgencyResult.patient_name}`);
                    // Force refresh of UrgentPatient and UrgentOrgan components
                    window.dispatchEvent(new Event('urgencyUpdated'));
                }
            }
        } catch (error) {
            setError("Failed to fetch organ data");
            setOrganId(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTestOrgans = async () => {
        setIsLoading(true);
        setMessage("");
        setError("");
        
        try {
            const result = await addTestOrgans();
            if (result.error) {
                setError(result.error);
            } else {
                setMessage("Test organs added successfully!");
            }
        } catch (error) {
            setError("Failed to add test organs");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="organ-fetcher-container">
            <h2 className="organ-fetcher-heading">Fetch Organ ID</h2>
            <div className="organ-fetcher-form">
                <input
                    type="number"
                    className="organ-fetcher-input"
                    placeholder="Enter Organ ID"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                    disabled={isLoading}
                />
                <button 
                    className="organ-fetcher-button" 
                    onClick={handleFetchOrganId}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Get Organ ID"}
                </button>
            </div>

            <button 
                className="organ-fetcher-button" 
                onClick={handleAddTestOrgans}
                disabled={isLoading}
                style={{ marginTop: "10px" }}
            >
                {isLoading ? "Adding..." : "Add Test Organs"}
            </button>

            {organId && (
                <div className="organ-fetcher-result">
                    <strong>Organ Details:</strong>
                    <div style={{ marginLeft: "10px" }}>
                        <div>Organ: {organId.organ}</div>
                        <div>Condition: {organId.organ_condition}</div>
                        <div>Hospital: {organId.hospital_location}</div>
                        <div>Transplant Time: {organId.transplant_time}</div>
                    </div>
                </div>
            )}
            {error && <div className="organ-fetcher-error">{error}</div>}
            {message && (
                <div style={{
                    color: "green",
                    marginTop: "12px",
                    padding: "8px 12px",
                    backgroundColor: "#d4edda",
                    borderRadius: "4px",
                    borderLeft: "3px solid #28a745"
                }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default OrganIdFetcher;