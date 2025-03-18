from flask import jsonify
from services.products_services import ProductsServices
from utils.responseModel.responsemodel import ResponseModel

def get_products_all():
    products = ProductsServices.get_products()
    return jsonify(ResponseModel(products))

def register_product(data):
    try:
        return jsonify(ResponseModel(ProductsServices.register_product(data.get('name'), data.get('price'), data.get('priceventa'), data.get('cant'), data.get('cant_actual'), data.get('estancia'), data.get('ganancia'), data.get('prov'))))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401)),

def delete_product(data):
    return jsonify(ResponseModel(ProductsServices.delete_product(data.get('id'))))

def search_product(data):
    response = ProductsServices.search_products(data.get('name'))

    if response is None:
        return jsonify(ResponseModel({'response': 'No se encontraron datos', 'product': response}, True, 404))
    
    return jsonify(ResponseModel(response))