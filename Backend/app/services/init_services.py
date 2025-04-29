from database import Connect
from datetime import datetime

connect = Connect()
collection_users = connect['Users']
collection_products = connect['Products']
collection_ventas = connect['Ventas']

class InitService:
    @staticmethod
    def init():
        now = datetime.now()
        primer_dia_mes = datetime(now.year, now.month, 1)
        primer_dia_proximo_mes = datetime(now.year, now.month + 1, 1) if now.month < 12 else datetime(now.year + 1, 1, 1)

        # Usuarios (puedes pedir solo los campos necesarios si quieres aún más rápido)
        users = [
            {**user, '_id': str(user['_id'])}
            for user in collection_users.find({}, {"password": 0})  # ejemplo: no traemos contraseñas
        ]

        products_low_stock = [
            {**product, '_id': str(product['_id'])}
            for product in collection_products.find({
                "$expr": { "$lt": [ { "$toInt": "$cantidad_actual" }, 10 ] }
            })
        ]


        # Ventas del mes actual (directamente en MongoDB)
        ventas_mes = [
            {**venta, '_id': str(venta['_id'])}
            for venta in collection_ventas.find({
                "fecha": {
                    "$gte": primer_dia_mes.strftime("%Y/%m/%d"),
                    "$lt": primer_dia_proximo_mes.strftime("%Y/%m/%d")
                }
            },
            {"fecha": 0, "usuario": 0, "descuent": 0, "recibido": 0, "method": 0})
        ]

        return {
            'resumVentas': ventas_mes,
            'resumLowUnits': products_low_stock,
            'users': users
        }
