import axios from "axios"

const BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = `${BASE_URL}/patients`; // Flask backend URL
const API_BASE_URL_2 = `${BASE_URL}/organs`;
const API_BASE_URL_3 = `${BASE_URL}/urgency/patient`;
const API_BASE_URL_4 = `${BASE_URL}/urgency/organ`;

// Fetch all patients
export const fetchAllPatients = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching patients:", error);
        return [];
    }
}; 

// Fetch a single patient by ID
export const fetchPatientById = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching patient:", error);
        return { error: "User not found" };
    }
};

// Function to get organ_id
export const fetchOrganId = async (organId) => {
    try {
        const response = await axios.get(`${API_BASE_URL_2}/${organId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching organ_id:", error);
        return { error: "Could not retrieve organ_id" };
    }
};

// Fetch urgent patient data
export const fetchUrgentPatient = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL_3}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching urgent patient:", error);
        return { error: "Could not retrieve patient data" };
    }
};

// Fetch urgent organ data
export const fetchUrgentOrgan = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL_4}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching urgent organ:", error);
        return { error: "Could not retrieve organ data" };
    }
};

// Add test patient data
export const addTestData = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add_test_data`);
        return response.data;
    } catch (error) {
        console.error("Error adding test data:", error);
        return { error: "Failed to add test data" };
    }
};

// Add test organ data
export const addTestOrgans = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL_2}/add_test_data`);
        return response.data;
    } catch (error) {
        console.error("Error adding test organs:", error);
        return { error: "Failed to add test organs" };
    }
};

// Calculate urgency for organ
export const calculateUrgency = async (organId) => {
    try {
        const response = await axios.post(`${BASE_URL}/urgency/calculate/${organId}`);
        if (response.data.error) {
            console.error("Server error:", response.data.error);
            return { error: response.data.error };
        }
        return response.data;
    } catch (error) {
        console.error("Error calculating urgency:", error.response?.data?.error || error.message);
        return { 
            error: error.response?.data?.error || 
                  error.response?.data?.message || 
                  "Could not calculate urgency. Please ensure both organ and patient data exist." 
        };
    }
};