from database import Connect
from models import User_models

collection_users = Connect()['Users']

class UserService:
    @staticmethod
    def get_users():
        return [
            {**user, '_id': str(user['_id'])}
            for user in collection_users.find({})
        ]

    @staticmethod
    def register_user(name, email, password, rol):
        if collection_users.find_one({'email': email}):
            return {'error': 'Usuario ya registrado'}

        user_id = collection_users.insert_one({
            'name': name,
            'email': email,
            'password': password,
            'rol': rol
        }).inserted_id

        user = collection_users.find_one({'_id': user_id})
        user['_id'] = str(user['_id'])
        return User_models(user), 201
