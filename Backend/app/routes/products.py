from flask import jsonify
from services.products_services import ProductsServices
from utils.responseModel.responsemodel import ResponseModel

def get_products_all():
    products = ProductsServices.get_products()
    return jsonify(ResponseModel(products))

def register_product(data):
    try:
        return jsonify(ResponseModel(ProductsServices.register_product(data.get('name'), data.get('price'), data.get('priceventa'), data.get('cant'), data.get('estancia'), data.get('ganancia'), data.get('prov'), data.get('idProduct'))))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))

def delete_product(data):
    try:
        return jsonify(ResponseModel({'product': ProductsServices.delete_product(data.get('id')), 'message': 'Eliminado con exito'}))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401)),

def search_product(data):
    response = ProductsServices.search_products(data.get('name'))

    if response is None:
        return jsonify(ResponseModel({'response': 'No se encontraron datos', 'product': response}, True, 404))
    
    return jsonify(ResponseModel(response))

def update_products(data):
    try:
        result_update = ProductsServices.update_products(data.get('name'), data.get('price'), data.get('priceventa'), data.get('cant'), data.get('cant_actual'), data.get('estancia'), data.get('ganancia'), data.get('prov'), data.get('id'), data.get('fecha'))

        if result_update is None:
            return jsonify(ResponseModel('Ha ocurrido un error', True, 404))
        
        return jsonify(ResponseModel(result_update))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))