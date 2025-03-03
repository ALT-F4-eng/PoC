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
        app.add_url_rule('/form/save', 'form_save', Form_view.save_couple, methods=['POST'])

    @staticmethod
    def get():
        return {'page':'form', 'method':'get'}

    @staticmethod
    def post():
        return {'page':'form', 'method':'post'}
    
    @staticmethod
    def save_couple():
        data = request.get_json()
        question = data.get("domanda", "")  
        answer = data.get("risposta", "")

        try:
            response = Controller().save_item(question, answer)
            return jsonify(response)
        except Exception as e:
            return jsonify({'status': False, 'message': str(e)}), 500 
