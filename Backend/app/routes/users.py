from flask import jsonify, request
from services.users_services import UserService
from werkzeug.security import generate_password_hash

def get_users():
    return jsonify(UserService.get_users())

def user_register():
    data = request.json
    pass_hashed = generate_password_hash(data.get('password'))
    return jsonify(UserService.register_user(data.get('name'), data.get('email'), pass_hashed, data.get('rol')))