from database import Connect

connect = Connect()
collection = connect['Box']

class BoxService:
    def get_all_deposits ():
        deposits = list(collection.find({}))
        for deposit in deposits:
            deposit['_id'] = str(deposit['_id'])
        return deposits
    
    def register_deposit (name, date, value):
        register = collection.insert_one({'name': name, 'date': date, 'value': value}).inserted_id
        data_new_deposit = collection.find_one({'_id': register})
        data_new_deposit['_id'] = str(data_new_deposit['_id'])

        return data_new_deposit