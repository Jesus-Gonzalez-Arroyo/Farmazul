from utils.responseModel.responsemodel import ResponseModel
from flask import jsonify
from services.ventas_services import VentasServices

def get_all_ventas():
    try:
        getVentas = VentasServices.get_ventas()
        return jsonify(ResponseModel(getVentas))
    except Exception as e:
        return jsonify(ResponseModel(e, True, 401))
    