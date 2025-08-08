from database import Connect
from bson.objectid import ObjectId

connect = Connect()
collection_ventas = connect['Devoluciones']

class ReturnsServices:
    @staticmethod
    def get_returns():
        returns = list(collection_ventas.find({}))
        for return_item in returns:
            return_item['_id'] = str(return_item['_id'])
        return returns
    
    @staticmethod
    def register_return(name, fecha, products):
        new_return = collection_ventas.insert_one({
            'fecha': fecha,
            'usuario': name,
            'products': products,
        }).inserted_id
        data_new_return = collection_ventas.find_one({'_id': new_return})
        data_new_return['_id'] = str(data_new_return['_id'])

        return data_new_return
