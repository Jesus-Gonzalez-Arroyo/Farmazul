from flask import Blueprint
from flask_jwt_extended import jwt_required
from routes.login import login_user, protected_user
from routes.users import get_users, user_register, userUpdate, userDelete
from routes.products import get_products_all, register_product, delete_product, update_products, unitsModifyProducts
from routes.ventas import get_all_ventas, register_venta, venta_delete
from routes.gastos import get_all_gastos, register_gasto, update_gasto, delete_gasto
from routes.box import get_deposits_all, register_deposit
from routes.init import init
from flask_cors import cross_origin
from flask import request, jsonify

api_bp = Blueprint('index', __name__, url_prefix="/index/API/v1")
const_origins = ["http://localhost:3000", "https://farmazul.vercel.app"]

@api_bp.route('/init', methods=['GET'])
def initDate():
    if request.method == 'GET':
        return init()

""" ----User routes---- """

@api_bp.route('/users', methods=['GET'])
def users():
    if request.method == 'GET':
        return get_users()

@api_bp.route('/users/register', methods=['POST'])
def register():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return user_register(request.json)

@api_bp.route('/users/update', methods=['POST'])
def updateInfoUser():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return userUpdate(request.json)

@api_bp.route('/users/delete', methods=['DELETE'])
def userInfoDelete():
    if request.method == 'DELETE':
        return userDelete(request.json)

""" ----Login routes---- """

@api_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return login_user(request.get_json())

@api_bp.route('/getInfoUser', methods=['GET', 'OPTIONS'])
@jwt_required()
def protect():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if(request.method == 'GET'):
        return protected_user()
    
""" ----Products routes---- """

@api_bp.route('/products', methods=['GET'])
def get_products():
    if request.method == 'GET':
        return get_products_all()

@api_bp.route('/products/register', methods=['OPTIONS', 'POST']) 
def register_product_inv():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return register_product(request.json)

@api_bp.route('/products/delete', methods=['DELETE'])
def product_delete():
    if request.method == 'DELETE':
        return delete_product(request.json)
    
@api_bp.route('products/update', methods=['POST', 'OPTIONS']) 
def products_udpdate():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return update_products(request.json)

@api_bp.route('products/modifyUnits', methods=['POST', 'OPTIONS'])
def productUnitDescuent():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    if request.method == 'POST':
        return unitsModifyProducts(request.json)
    
""" --------- Ventas routes ----------- """
@api_bp.route('/ventas', methods=['GET'])
def get_ventas():
    if(request.method == 'GET'):
        return get_all_ventas()

@api_bp.route('ventas/register', methods=['POST', 'OPTIONS'])
def ventas_register():
    if(request.method == 'POST'):
        return register_venta(request.json)
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    
@api_bp.route('ventas/delete', methods=['DELETE'])
def ventas_delete():
    if(request.method == 'DELETE'):
        return venta_delete(request.json)
    
"""  ---------- Gastos routes ---------- """

@api_bp.route('/gastos', methods=['GET'])
def get_gastos():
    if(request.method == 'GET'):
        return get_all_gastos()

@api_bp.route('/gastos/register', methods=['POST', 'OPTIONS']) 
def addNewGasto():
    if(request.method == 'POST'):
        return register_gasto(request.json)
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200

@api_bp.route('/gastos/update', methods=['POST', 'OPTIONS']) 
def updateInfoGasto():
    if(request.method == 'POST'):
        return update_gasto(request.json)
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
    
@api_bp.route('/gastos/delete', methods=['DELETE'])
def gasto_delete():
    if request.method == 'DELETE':
        return delete_gasto(request.json)

""" ------------------- Box routes -----------------------"""
@api_bp.route('/box')
def get_deposits_box():
    if request.method == 'GET':
        return get_deposits_all()

@api_bp.route('/box', methods=['POST', 'OPTIONS']) 
def deposit_register():
    if(request.method == 'POST'):
        return register_deposit(request.json)
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Metodo no permitido'}), 200
