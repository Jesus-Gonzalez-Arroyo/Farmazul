from database import Connect
from models import User_models
from bson.objectid import ObjectId

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
        return user, 201

    @staticmethod
    def updateUser(name, user, password, rol, id):
        result = collection_users.find_one_and_update(
            {'_id': ObjectId(id)},
            {"$set": {
                'name': name, 
                'email': user, 
                'password': password, 
                'rol': rol
            }},
            return_document=True
        )

        if result:
            result['_id'] = str(result['_id'])             
            return result, 201
        else:
            return None
    
    @staticmethod
    def deleteUser(id):
        result = collection_users.find_one_and_delete({'_id': ObjectId(id)})
        result['_id'] = str(result['_id'])
        return result
