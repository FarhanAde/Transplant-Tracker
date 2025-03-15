from flask import Blueprint, jsonify
from database import supabase
import logging

bp = Blueprint('organs', __name__, url_prefix='/api/organs')

@bp.route('/', methods=['GET'])
def get_all_organs():
    try:
        response = supabase.table('organs').select('*').execute()
        return jsonify(response.data)
    except Exception as e:
        logging.error(f"Error fetching organs: {str(e)}")
        return jsonify({"error": str(e)}), 500

@bp.route('/<int:organ_id>', methods=['GET'])
def get_organ(organ_id):
    try:
        response = supabase.table('organs').select('*').eq('organ_id', organ_id).execute()
        if response.data:
            return jsonify(response.data[0])
        return jsonify({"error": "Organ not found"}), 404
    except Exception as e:
        logging.error(f"Error fetching organ {organ_id}: {str(e)}")
        return jsonify({"error": str(e)}), 500

@bp.route('/add_test_data', methods=['POST'])
def add_test_organs():
    try:
        # First, check if organs already exist
        existing = supabase.table('organs').select('organ_id').execute()
        if existing.data:
            # Delete existing organs
            supabase.table('organs').delete().neq('organ_id', 0).execute()
        
        test_organs = [
            {
                "organ_id": 1,
                "donor_id": 1,
                "organ": "Heart",
                "organ_condition": "Good",
                "transplant_time": "24 hours",
                "hospital_location": "London Royal Hospital",
                "patient_id": None
            },
            {
                "organ_id": 2,
                "donor_id": 2,
                "organ": "Kidney",
                "organ_condition": "Excellent",
                "transplant_time": "12 hours",
                "hospital_location": "Manchester General Hospital",
                "patient_id": None
            },
            {
                "organ_id": 3,
                "donor_id": 3,
                "organ": "Liver",
                "organ_condition": "Fair",
                "transplant_time": "6 hours URGENT",
                "hospital_location": "Birmingham City Hospital",
                "patient_id": None
            }
        ]
        
        # Try to insert one organ first to test the connection
        test_response = supabase.table('organs').insert([test_organs[0]]).execute()
        if not test_response.data:
            logging.error("Failed to insert test organ")
            return jsonify({"error": "Database connection failed"}), 500
            
        # If successful, insert the rest
        response = supabase.table('organs').insert(test_organs[1:]).execute()
        if response.data:
            return jsonify({"message": "Test organs added successfully", "data": response.data})
        return jsonify({"error": "Failed to add remaining test organs"}), 500
    except Exception as e:
        logging.error(f"Error adding test organs: {str(e)}")
        return jsonify({"error": f"Database error: {str(e)}"}), 500