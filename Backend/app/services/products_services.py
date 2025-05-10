from database import Connect
from bson.objectid import ObjectId

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
    def register_product(name, price, priceventa, cant, estancia, ganancia, prov, idProduct):
        if collection_products.find_one({'name': name}):
            return {'error': 'Producto ya registrado'}
        
        new_product = collection_products.insert_one({'name': name, 'price': price, 'price_venta': priceventa, 'cantidad': cant, 'estancia': estancia, 'ganancia': ganancia, 'proveedor': prov, 'idProduct': idProduct}).inserted_id
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
        result = collection_products.find_one_and_delete({'_id': ObjectId(id)})
        result['_id'] = str(result['_id'])
        return result

    @staticmethod    
    def update_products(name, price, priceventa, cant, cant_actual, estancia, ganancia, prov, id, fecha):
        result = collection_products.find_one_and_update(
            {'_id': ObjectId(id)},
            {"$set": {
                'name': name, 
                'price': price, 
                'price_venta': priceventa, 
                'cantidad': cant, 
                'cantidad_actual': cant_actual, 
                'estancia': estancia,
                'ganancia': ganancia, 
                'proveedor': prov,
                'fecha': fecha
            }},
            return_document=True
        )

        if result:
            result['_id'] = str(result['_id'])             
            return result, 201
        else:
            return None

