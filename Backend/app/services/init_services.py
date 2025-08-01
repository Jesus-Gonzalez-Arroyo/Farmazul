from database import Connect
from datetime import datetime

connect = Connect()
collection_users = connect['Users']
collection_products = connect['Products']
collection_ventas = connect['Ventas']
collection_gastos = connect['Gastos']

class InitService:
    @staticmethod
    def init():
        now = datetime.now()
        primer_dia_mes = datetime(now.year, now.month, 1)
        primer_dia_proximo_mes = datetime(now.year, now.month + 1, 1) if now.month < 12 else datetime(now.year + 1, 1, 1)

        users = [
            {**user, '_id': str(user['_id'])}
            for user in collection_users.find({}, {"password": 0})
        ]

        products_low_stock = [
            {**product, '_id': str(product['_id'])}
            for product in collection_products.find(
                {
                    "$expr": { "$lt": [ { "$toInt": "$cantidad" }, 10 ] }
                },
                {
                    "estancia": 0, "fecha": 0, "ganancia": 0, "price": 0, "price_venta": 0, "proveedor": 0
                }
            )
        ]

        ventas_mes = []
        for venta in collection_ventas.find({}, {"usuario": 0, "descuent": 0, "recibido": 0, "method": 0}):
            try:
                fecha_venta = datetime.strptime(venta["fecha"], "%d/%m/%Y")
                if primer_dia_mes <= fecha_venta < primer_dia_proximo_mes:
                    venta['_id'] = str(venta['_id'])
                    ventas_mes.append(venta)
            except (KeyError, ValueError):
                print(KeyError)
                continue

        gastos_mes = []
        for gasto in collection_gastos.find({}, {"descripcion": 0, "estado": 0, "valordeuda": 0, "type": 0}):
            try:
                fecha_gasto = datetime.strptime(gasto["fecha"], "%Y-%m-%d")
                if primer_dia_mes <= fecha_gasto < primer_dia_proximo_mes:
                    gasto['_id'] = str(gasto['_id'])
                    gastos_mes.append(gasto)
            except (KeyError, ValueError):
                print(KeyError)
                continue

        return {
            'resumVentas': ventas_mes,
            'resumLowUnits': products_low_stock,
            'users': users,
            'gastosMonth': gastos_mes
        }
