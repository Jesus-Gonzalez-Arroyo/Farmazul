from database import Connect
from bson.objectid import ObjectId

connect = Connect()
collection_gastos = connect['Gastos']

class GastosServices:
    @staticmethod
    def get_gastos():
        gastos = list(collection_gastos.find({}))
        for gasto in gastos:
            gasto['_id'] = str(gasto['_id'])
        return gastos
    
    @staticmethod
    def register_gasto(name, price, type, state, valordeuda, fecha, descripcion):        
        new_gasto = collection_gastos.insert_one({'name': name, 'price': price, 'type': type, 'estado': state, 'valordeuda': valordeuda, 'fecha': fecha, 'descripcion': descripcion}).inserted_id
        data_gasto = collection_gastos.find_one({'_id': new_gasto})
        data_gasto['_id'] = str(data_gasto['_id'])
        
        return data_gasto, 201

    @staticmethod
    def delete_gasto(id):
        result = collection_gastos.find_one_and_delete({'_id': ObjectId(id)})
        result['_id'] = str(result['_id'])
        return result

    @staticmethod    
    def update_gasto(name, price, type, state, valordeuda, fecha, descripcion, id):
        result = collection_gastos.find_one_and_update(
            {'_id': ObjectId(id)},
            {"$set": {
                'name': name, 
                'price': price, 
                'type': type, 
                'estado': state, 
                'valordeuda': valordeuda, 
                'fecha': fecha,
                'descripcion': descripcion
            }},
            return_document=True
        )

        if result:
            result['_id'] = str(result['_id'])             
            return result, 201
        else:
            return None