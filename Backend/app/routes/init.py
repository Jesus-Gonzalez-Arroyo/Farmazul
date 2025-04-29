from flask import Blueprint, jsonify
from utils.responseModel.responsemodel import ResponseModel
from services.init_services import InitService

def init():
    res = InitService.init()
    return jsonify(ResponseModel(res))
