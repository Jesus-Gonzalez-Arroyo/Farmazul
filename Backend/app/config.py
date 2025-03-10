import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    URL_DATABASE=os.getenv("MONGO_URI")
    DEBUG=os.getenv("DEBUG")
    NAME_DB=os.getenv('DB_NAME')
    SECRET_KEY = os.getenv("SECRET_KEY")