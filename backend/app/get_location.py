from urgency import organ, urgent_patient as patient

def get_organ_location():
    return organ['hospital_location']

def get_patient_location(patient):
    data = patient.data[0]
    return data['hospital_location']

