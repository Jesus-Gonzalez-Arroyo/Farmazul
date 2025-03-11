from flask import Blueprint
from flask_jwt_extended import jwt_required
from routes.login import login_user, protected_user
from routes.users import get_users, user_register
from flask_cors import cross_origin
from flask import request, jsonify
from services.login_services import LoginService

users_bp = Blueprint('index', __name__, url_prefix="/index/API/v1")

@users_bp.route('/users', methods=['GET'])
def users():
    return get_users()

@users_bp.route('/register', methods=['POST'])
def register():
    return user_register()

@cross_origin(origins='*')
@users_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return login_user(request.get_json())

@cross_origin(origins='*')
@users_bp.route('/getInfoUser', methods=['GET', 'OPTIONS'])
@jwt_required()
def protect():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if(request.method == 'GET'):
        return protected_user()
