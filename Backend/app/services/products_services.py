from database import Connect
from bson.objectid import ObjectId
from models import User_models

connect = Connect()
collection_products = connect['Products']

class ProductsServices:
    @staticmethod
    def get_products():
        users = list(collection_products.find({}))
        for user in users:
            user['_id'] = str(user['_id'])
        return users
    
    @staticmethod
    def register_product(name, price, priceventa, cant, cant_actual, estancia, ganancia, prov):
        if collection_products.find_one({'name': name}):
            return {'error': 'Producto ya registrado'}
        
        new_product = collection_products.insert_one({'name': name, 'price': price, 'price_venta': priceventa, 'cantidad': cant, 'cantidad_actual': cant_actual, 'estancia': estancia, 'ganancia': ganancia, 'proveedor': prov}).inserted_id
        data_product = collection_products.find_one({'_id': new_product})
        data_product['_id'] = str(data_product['_id'])
        
        return data_product, 201
    
    @staticmethod
    def search_products(name):
        products = list(collection_products.find({'name': name}))

        if products is None:
            return None
        
        for product in products:
            product['_id'] = str(product['_id'])

        return products
    
    @staticmethod
    def delete_product(id):
        result = collection_products.delete_one({'_id': ObjectId(id)})
        if result.deleted_count == 1:
            return 'Eliminado con exito'
        return 'Ocurrio un error'
