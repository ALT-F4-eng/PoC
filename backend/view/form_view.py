from flask import request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.controller.controller import Controller

class Form_view:
    @staticmethod
    def register(app):
        app.add_url_rule('/form', 'form_get', Form_view.get, methods=['GET'])
        app.add_url_rule('/form', 'form_post', Form_view.post, methods=['POST'])

    @staticmethod
    def get():
        return {'page':'form', 'method':'get'}

    @staticmethod
    def post():
        return {'page':'form', 'method':'post'}