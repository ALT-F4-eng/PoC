from flask import request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.controller.controller import Controller

class Home_view:
    @staticmethod
    def register(app):
        app.add_url_rule('/', 'home_get', Home_view.get, methods=['GET'])
        app.add_url_rule('/', 'home_post', Home_view.post, methods=['POST'])

    @staticmethod
    def get():
        return {'page':'home', 'method':'get'}

    @staticmethod
    def post():
        return {'page':'home', 'method':'post'}