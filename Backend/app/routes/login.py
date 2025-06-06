from flask import Blueprint, jsonify, request
from services.login_services import LoginService
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from utils.responseModel.responsemodel import ResponseModel

def login_user(data):     
    try:
        user_find = LoginService.login(data['email'])

        if user_find is None:
            return jsonify(ResponseModel('Usuario incorrecto', True, 404)), 404

        if not check_password_hash(user_find['password'], data['password']):
            return jsonify(ResponseModel('Contraseña incorrecta', True, 401))
        
        access_token = create_access_token(identity=user_find['_id'])
        return jsonify(ResponseModel({'access_token': access_token, 'rol_user': user_find['rol']}))

    except Exception as e:
        return jsonify(ResponseModel(e, True, 401))

def protected_user():
    try:
        current_user_id = get_jwt_identity()
        user = LoginService.get_user_by_id(current_user_id)

        if not user or user is None:
            return jsonify(ResponseModel('Usuario incorrecto', True, 404))
        
        return jsonify(ResponseModel({
            'name': user['name'],
            'rol': user['rol']
        }))
    except Exception as e:
        return jsonify({'error': str(e)}), 500
