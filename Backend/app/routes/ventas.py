from utils.responseModel.responsemodel import ResponseModel
from flask import jsonify, request
from services.ventas_services import VentasServices

def get_all_ventas():
    try:
        getVentas = VentasServices.get_ventas()
        return jsonify(ResponseModel(getVentas))
    except Exception as e:
        return jsonify(ResponseModel(e, True, 401))
    
def register_venta(data):
    try:
        VentasServices.register_ventas(data.get('name'), data.get('fecha'), data.get('valor'), data.get('products'), data.get('descuent'), data.get('recibido'), data.get('method'))
        return jsonify(ResponseModel('Exito.'))
    except Exception as e:
        return jsonify(ResponseModel(e, True, 401))

def venta_delete(data):
    try:
        return jsonify(ResponseModel(VentasServices.delete_venta(data.get('id'))))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))
