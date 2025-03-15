from flask import Blueprint, jsonify
import logging
from urgency import calculate_urgency, current_organ, current_patient

bp = Blueprint('urgency', __name__, url_prefix='/api/urgency')

@bp.route('/calculate/<int:organ_id>', methods=['POST'])
def update_urgency(organ_id):
    try:
        global current_organ, current_patient
        
        # Log the start of urgency calculation
        logging.info(f"Starting urgency calculation for organ ID: {organ_id}")
        
        organ, patient = calculate_urgency(organ_id)
        
        if not organ:
            logging.error(f"No organ found with ID: {organ_id}")
            return jsonify({"error": "Could not find organ with specified ID. Please ensure the organ exists in the database."}), 404
            
        if not patient:
            logging.error(f"No matching patients found for organ ID: {organ_id}")
            return jsonify({"error": "No matching patients found for this organ. Please ensure there are patients in the database."}), 404
            
        current_organ = organ
        current_patient = patient
        
        logging.info(f"Successfully calculated urgency for organ {organ_id}. Matched with patient {patient['name']}")
        return jsonify({
            "message": "Urgency calculated successfully",
            "organ": organ['organ'],
            "patient_name": patient['name']
        })
    except Exception as e:
        logging.error(f"Error in update_urgency: {str(e)}")
        return jsonify({
            "error": "Could not calculate urgency. Please check server logs for details.",
            "details": str(e)
        }), 500

@bp.route('/patient', methods=['GET'])
def get_patient():
    if current_patient:
        return jsonify(current_patient)
    return jsonify({"error": "No urgent patient found. Please calculate urgency first."}), 404

@bp.route('/organ', methods=['GET'])
def get_organ():
    if current_organ:
        return jsonify(current_organ)
    return jsonify({"error": "No urgent organ found. Please calculate urgency first."}), 404

