from services.box_services import BoxService
from utils.responseModel.responsemodel import ResponseModel
from flask import jsonify

def get_deposits_all():
    return jsonify(ResponseModel(BoxService.get_all_deposits()))

def register_deposit(data):
    try:
        registe = BoxService.register_deposit(data.get('name'), data.get('date'), data.get('value'))
        return jsonify(ResponseModel(registe))
    except Exception as e:
        return jsonify(ResponseModel(str(e), True, 401))
