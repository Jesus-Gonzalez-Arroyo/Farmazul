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
    def update_products(name, price, priceventa, cant, estancia, ganancia, prov, id, idProduct):
        result = collection_products.find_one_and_update(
            {'_id': ObjectId(id)},
            {"$set": {
                'name': name, 
                'price': price, 
                'price_venta': priceventa, 
                'cantidad': cant,
                'estancia': estancia,
                'ganancia': ganancia, 
                'proveedor': prov,
                'idProduct': idProduct
            }},
            return_document=True
        )

        if result:
            result['_id'] = str(result['_id'])             
            return result, 201
        else:
            return None
    
    @staticmethod
    def descuentUnits(products):
        updated_products = []

        for product in products:
            product_id = ObjectId(product['id'])
            cantSold = int(product['cantidad'])

            product_found = collection_products.find_one({'_id': product_id})
            new_cant = int(product_found['cantidad']) - cantSold

            updated = collection_products.find_one_and_update(
                {'_id': product_id},
                {'$set': {'cantidad': str(new_cant)}},
                return_document=True
            )

            if updated:
                updated['_id'] = str(updated['_id'])
                updated_products.append(updated)

        return updated_products

