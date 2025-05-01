from flask import jsonify, request
from services.users_services import UserService
from utils.responseModel.responsemodel import ResponseModel
from werkzeug.security import generate_password_hash

def get_users():
    return jsonify(ResponseModel(UserService.get_users()))

def user_register(data):
    try:
        pass_hashed = generate_password_hash(data.get('password'))
        return jsonify(ResponseModel(UserService.register_user(data.get('name'), data.get('user'), pass_hashed, data.get('rol'))))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))

def userUpdate(data):
    try:
        return jsonify(ResponseModel(UserService.updateUser(data.get('name'), data.get('user'), data.get('password'), data.get('rol'), data.get('id'))))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))

def userDelete(data):
    try:
        return jsonify(ResponseModel(UserService.deleteUser(data.get('id'))))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))
    