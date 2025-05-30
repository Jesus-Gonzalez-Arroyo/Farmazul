from flask import jsonify
from services.products_services import ProductsServices
from utils.responseModel.responsemodel import ResponseModel

def safe_response(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            return jsonify(ResponseModel(str(e), error=True, code=500))
    return wrapper

@safe_response
def get_products_all():
    products = ProductsServices.get_products()
    return jsonify(ResponseModel(products))

@safe_response
def register_product(data):
    product = ProductsServices.register_product(
        data.get('name'),
        data.get('price'),
        data.get('priceventa'),
        data.get('cant'),
        data.get('estancia'),
        data.get('ganancia'),
        data.get('prov'),
        data.get('idProduct')
    )
    return jsonify(ResponseModel(product))

@safe_response
def delete_product(data):
    result = ProductsServices.delete_product(data.get('id'))
    if result is None:
        return jsonify(ResponseModel('Ha ocurrido un error al eliminar', True, 404))
    return jsonify(ResponseModel({'product': result, 'message': 'Eliminado con éxito'}))

@safe_response
def search_product(data):
    result = ProductsServices.search_products(data.get('name'))
    if not result:
        return jsonify(ResponseModel({'message': 'No se encontraron productos', 'product': result}, True, 404))
    return jsonify(ResponseModel(result))

@safe_response
def update_products(data):
    result = ProductsServices.update_products(
        data.get('name'),
        data.get('price'),
        data.get('priceventa'),
        data.get('cant'),
        data.get('estancia'),
        data.get('ganancia'),
        data.get('prov'),
        data.get('id'),
        data.get('idProduct')
    )
    if result is None:
        return jsonify(ResponseModel('No se pudo actualizar el producto', True, 404))
    return jsonify(ResponseModel(result))

@safe_response
def descuentUnitsProducts(data):
    result = ProductsServices.descuentUnits(data)
    return jsonify(ResponseModel(result))
