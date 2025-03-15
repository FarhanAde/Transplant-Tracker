import os
from dotenv import load_dotenv 
from supabase import create_client, Client

load_dotenv()


url = os.getenv("SUPA_URL")
key = os.getenv("SUPA_KEY")

supabase: Client = create_client(url, key)

