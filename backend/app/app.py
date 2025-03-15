from flask import Flask, request, jsonify 
from flask_cors import CORS
from database import supabase
import donors_route, organ_route, patient_route, urgency_route

app = Flask(__name__)
CORS(app)

app.register_blueprint(donors_route.bp)
app.register_blueprint(organ_route.bp)
app.register_blueprint(patient_route.bp)
app.register_blueprint(urgency_route.bp)

@app.route('/api/add_organ', methods=['POST'])
def add_organ():
    data = request.json 
    if not data or 'donor_id' not in data or 'organ' not in data or 'hospital_location' not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        response = supabase.table('organs').insert([{
            "patient_id": None,
            "donor_id": data['donor_id'],
            "organ": data['organ'],
            "organ_condition": data.get('organ_condition'),
            "transplant_time": data.get('time_elapsed'),
            "hospital_location": data['hospital_location']
        }]).execute()

        if response.data:
            return jsonify({"message": "Organ added successfully", "data": response.data[0]}), 201
        return jsonify({"error": "Failed to add organ"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/get_organ_id/<int:organ_id>', methods=['GET'])
def get_organ_id(organ_id):
    response = supabase.table('organs').select('*').eq('organ_id', organ_id).execute()
    if response.data:
        return jsonify(response.data[0])
    return jsonify({"error": "Organ not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)