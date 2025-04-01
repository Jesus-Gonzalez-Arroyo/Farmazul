from database import Connect
from bson.objectid import ObjectId

connect = Connect()
collection_users = connect['Users']

class LoginService:
    @staticmethod
    def login(email):
        user = collection_users.find_one({'email': email})        
        if not user:
            return None 
        
        user['_id'] = str(user['_id'])
        return user
    
    @staticmethod
    def get_user_by_id(id):
        user = collection_users.find_one({'_id': ObjectId(id)})
        if not user:
            return None
        
        user['_id'] = str(user['_id'])
        return user
