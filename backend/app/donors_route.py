from flask import Blueprint, jsonify
from database import supabase

bp = Blueprint('donors', __name__, url_prefix='/api/donors')

@bp.route('/', methods=['GET'])
def get_all_donors():
    response = supabase.table('donors').select('*').execute()
    return jsonify(response.data)

@bp.route('/<int:user_id>', methods=['GET'])
def get_donor(user_id):
    response = supabase.table('donors').select('*').eq('id', user_id).execute()
    if response.data:
        return jsonify(response.data[0])
    return jsonify({"error": "User not found"}), 404