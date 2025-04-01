from database import Connect

connect = Connect()
collection_ventas = connect['Ventas']

class VentasServices:
    @staticmethod
    def get_ventas():
        ventas = list(collection_ventas.find({}))
        for venta in ventas:
            venta['_id'] = str(venta['_id'])
        return ventas