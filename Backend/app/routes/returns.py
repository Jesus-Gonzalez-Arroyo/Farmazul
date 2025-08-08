from services.returns_services import ReturnsServices
from flask import jsonify, request

def get_returns():
    try:
        return jsonify(ReturnsServices.get_returns())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def register_return():
    data = request.get_json()
    try:
        return jsonify(ReturnsServices.register_return(
            name=data.get('name'),
            fecha=data.get('fecha'),
            products=data.get('products')
        ))
    except Exception as e:
        return jsonify({'error': str(e)}), 500