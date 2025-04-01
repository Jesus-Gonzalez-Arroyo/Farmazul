from flask import Blueprint
from flask_jwt_extended import jwt_required
from routes.login import login_user, protected_user
from routes.users import get_users, user_register
from routes.products import get_products_all, register_product, delete_product, search_product, update_products
from routes.ventas import get_all_ventas
from flask_cors import cross_origin
from flask import request, jsonify

api_bp = Blueprint('index', __name__, url_prefix="/index/API/v1")

""" ----User routes---- """

@api_bp.route('/users', methods=['GET'])
def users():
    if request.method == 'GET':
        return get_users()

@api_bp.route('/register', methods=['POST'])
def register():
    return user_register()


""" ----Login routes---- """

@cross_origin(origins='*')
@api_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return login_user(request.get_json())

@cross_origin(origins='*')
@api_bp.route('/getInfoUser', methods=['GET', 'OPTIONS'])
@jwt_required()
def protect():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if(request.method == 'GET'):
        return protected_user()
    
""" ----Products routes---- """

@api_bp.route('/get_products_all', methods=['GET'])
def get_products():
    if request.method == 'GET':
        return get_products_all()

@api_bp.route('/register_product', methods=['OPTIONS', 'POST']) 
def register_product_inv():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return register_product(request.json)

@api_bp.route('/delete_product', methods=['DELETE'])
def product_delete():
    if request.method == 'DELETE':
        return delete_product(request.json)

@api_bp.route('/search_product', methods=['POST'])
def product_search():
    if request.method == 'POST':
        return search_product(request.json)
    
@api_bp.route('/update_product', methods=['POST', 'OPTIONS']) 
def products_udpdate():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return update_products(request.json)
    
""" --------- Ventas routes ----------- """
@api_bp.route('/get_ventas', methods=['GET'])
def get_ventas():
    if(request.method == 'GET'):
        return get_all_ventas()