from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def Connect():
    url_database = os.getenv('MONGO_URI')
    client = MongoClient(
        url_database
    )
    db = client[os.getenv('DB_NAME')]
    return db
