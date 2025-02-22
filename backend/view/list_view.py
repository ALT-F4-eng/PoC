from flask import request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.controller.controller import Controller

class list_view:
    @staticmethod
    def register(app):
        app.add_url_rule('/list', 'list_get', list_view.get, methods=['GET'])
        app.add_url_rule('/list', 'list_post', list_view.post, methods=['POST'])

    @staticmethod
    def get():
        return {'page':'list', 'method':'get'}

    @staticmethod
    def post():
        return {'page':'list', 'method':'post'}