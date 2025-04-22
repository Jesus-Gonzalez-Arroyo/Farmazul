from flask import jsonify
from utils.responseModel.responsemodel import ResponseModel
from services.gastos_services import GastosServices

def get_all_gastos():
    gastos = GastosServices.get_gastos()
    return jsonify(ResponseModel(gastos))

def register_gasto(data):
    try:
        return jsonify(ResponseModel(GastosServices.register_gasto(data.get('name'), data.get('price'), data.get('type'), data.get('estado'), data.get('valordeuda'), data.get('fecha'), data.get('descripcion'))))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))
    
def update_gasto(data):
    try:
        return jsonify(ResponseModel(GastosServices.update_gasto(data.get('name'), data.get('price'), data.get('type'), data.get('estado'), data.get('valordeuda'), data.get('fecha'), data.get('descripcion'), data.get('id'))))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))

def delete_gasto(data):
    try:
        return jsonify(ResponseModel({'product': GastosServices.delete_gasto(data.get('id')), 'message': 'Eliminado con exito'}))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401)),
