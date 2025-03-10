from database import Connect
from models import User_models

connect = Connect()
collection_users = connect['Users']

class UserService:
    @staticmethod
    def get_users():
        users = list(collection_users.find({}))
        for user in users:
            user['_id'] = str(user['_id'])
        return users
    
    @staticmethod
    def register_user(name, email, password, rol):
        if collection_users.find_one({'email': email}):
            return {'error': 'Usuario ya registrado'}
        
        new_user = collection_users.insert_one({'name': name, 'email': email, 'password':password, 'rol': rol}).inserted_id
        data_user = collection_users.find_one({'_id': new_user})
        data_user['_id'] = str(data_user['_id'])
        
        return User_models(data_user), 201
    

