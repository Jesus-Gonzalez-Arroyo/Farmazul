from flask import Flask
from config import Config
from flask_jwt_extended import JWTManager
from routes.__init__ import blueprints_user

def create_api():
    app = Flask(__name__)

    app.config.from_object(Config)

    JWTManager(app)

    app.register_blueprint(blueprints_user)
    
    return app
