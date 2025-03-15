import os
from openai import OpenAI
from dotenv import load_dotenv 
from supabase import create_client, Client
import json 
import logging
from database import supabase

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

#from config import OPENAI_API_KEY

client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))

def calculate_urgency(organ_id):
    try:
        # Validate OpenAI API key
        if not os.getenv("OPENAI_API_KEY"):
            logger.error("OpenAI API key not found")
            return None, None

        # Get organ details
        logger.info(f"Fetching organ details for ID: {organ_id}")
        organ_response = supabase.table("organs").select("*").eq("organ_id", organ_id).execute()
        if not organ_response.data:
            logger.error(f"No organ found with ID: {organ_id}")
            return None, None

        organ = organ_response.data[0]
        logger.info(f"Found organ: {organ['organ']} with ID: {organ_id}")
        
        # Get all patients
        logger.info("Fetching all patients")
        patients_response = supabase.table("patients").select("*").execute()
        if not patients_response.data:
            logger.error("No patients found in database")
            return None, None

        patients = patients_response.data
        logger.info(f"Found {len(patients)} patients")
        
        # Create prompt for urgency calculation
        prompt = f"""Calculate the urgency of each patient in needing a {organ['organ']} transplant.
        Organ details:
        - Condition: {organ['organ_condition']}
        - Hospital: {organ['hospital_location']}
        - Time: {organ['transplant_time']}
        
        Patient details:
        {json.dumps(patients, indent=2)}
        
        Give only the results in decimal from 0 to 1. If a patient does not need the transplant, give them an urgency of 0.0.
        Also prioritize how close the distance between hospital_location of the organ and the hospital_location of the patient is.
        Return only a python-parseable json list of lists without any tags, with key 'result', of patient_id and urgency rating for patients who's urgency scores is greater than 0.0"""

        try:
            logger.info("Making GPT API call for urgency calculation")
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a healthcare professional evaluating the urgency of different patients for organ transplant"},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            
            result = json.loads(response.choices[0].message.content)
            urgent_list = result.get('result', [])
            
            if not urgent_list:
                logger.error("No urgent matches found from GPT response")
                return None, None
                
            # Get the most urgent patient
            most_urgent = max(urgent_list, key=lambda x: x[1])
            patient_id = most_urgent[0]
            logger.info(f"Most urgent patient ID: {patient_id} with urgency score: {most_urgent[1]}")
            
            # Get patient details
            urgent_patient = next((p for p in patients if p['patient_id'] == patient_id), None)
            if not urgent_patient:
                logger.error(f"Could not find patient with ID: {patient_id}")
                return None, None
                
            logger.info(f"Successfully matched organ {organ['organ']} with patient {urgent_patient['name']}")
            return organ, urgent_patient
            
        except Exception as e:
            logger.error(f"Error in GPT API call: {str(e)}")
            return None, None
            
    except Exception as e:
        logger.error(f"Error in calculate_urgency: {str(e)}")
        return None, None

# Global variables to store current urgent organ and patient
current_organ = None
current_patient = None
