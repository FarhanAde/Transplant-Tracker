from flask import Blueprint, jsonify
from database import supabase
import logging

bp = Blueprint('patients', __name__, url_prefix='/api/patients')

@bp.route('/', methods=['GET'])
def get_all_patients():
    try:
        response = supabase.table('patients').select('*').execute()
        return jsonify(response.data)
    except Exception as e:
        logging.error(f"Error fetching patients: {str(e)}")
        return jsonify({"error": str(e)}), 500

@bp.route('/<int:user_id>', methods=['GET'])
def get_patient(user_id):
    try:
        response = supabase.table('patients').select('*').eq('id', user_id).execute()
        if response.data:
            return jsonify(response.data[0])
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        logging.error(f"Error fetching patient {user_id}: {str(e)}")
        return jsonify({"error": str(e)}), 500

@bp.route('/add_test_data', methods=['POST'])
def add_test_data():
    try:
        # First, check if the table exists and has the correct schema
        test_patients = [
            {
                "patient_id": 1,
                "name": "John Smith",
                "age": 45,
                "gender": "Male",
                "blood_type": "A+",
                "health_conditions": "End-stage kidney disease",
                "prescriptions": "Dialysis, Blood pressure medication",
                "hospital_location": "London Royal Hospital"
            },
            {
                "patient_id": 2,
                "name": "Sarah Johnson",
                "age": 32,
                "gender": "Female",
                "blood_type": "O-",
                "health_conditions": "Liver failure",
                "prescriptions": "Liver support medication",
                "hospital_location": "Manchester General Hospital"
            },
            {
                "patient_id": 3,
                "name": "Michael Brown",
                "age": 58,
                "gender": "Male",
                "blood_type": "B+",
                "health_conditions": "Heart failure",
                "prescriptions": "Heart medication, Blood thinners",
                "hospital_location": "Birmingham City Hospital"
            }
        ]
        
        # Try to insert one patient first to test the connection
        test_response = supabase.table('patients').insert([test_patients[0]]).execute()
        if not test_response.data:
            logging.error("Failed to insert test patient")
            return jsonify({"error": "Database connection failed"}), 500
            
        # If successful, insert the rest
        response = supabase.table('patients').insert(test_patients[1:]).execute()
        if response.data:
            return jsonify({"message": "Test data added successfully", "data": response.data})
        return jsonify({"error": "Failed to add remaining test data"}), 500
    except Exception as e:
        logging.error(f"Error adding test data: {str(e)}")
        return jsonify({"error": f"Database error: {str(e)}"}), 500