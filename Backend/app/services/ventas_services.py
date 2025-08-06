from database import Connect
from bson.objectid import ObjectId

connect = Connect()
collection_ventas = connect['Ventas']

class VentasServices:
    @staticmethod
    def get_ventas():
        ventas = list(collection_ventas.find({}))
        for venta in ventas:
            venta['_id'] = str(venta['_id'])
        return ventas
    
    @staticmethod
    def register_ventas(name, fecha, valor, products, descuent, recibido, method):
        new_venta = collection_ventas.insert_one({'fecha': fecha, 'valor': valor, 'usuario': name, 'products': products, 'descuent': descuent, 'recibido': recibido, 'method': method }).inserted_id
        data_new_venta = collection_ventas.find_one({'_id': new_venta})
        data_new_venta['_id'] = str(data_new_venta['_id'])

        return data_new_venta
    
    def delete_venta(id):
        result = collection_ventas.find_one_and_delete({'_id': ObjectId(id)})
        result['_id'] = str(result['_id'])

        return result

