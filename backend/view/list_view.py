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
        app.add_url_rule('/list/modify_item', 'list_modify_item', list_view.modify_item, methods=['POST'])
        app.add_url_rule('/list/delete_item', 'list_delete_item', list_view.delete_item, methods=['GET'])

    @staticmethod
    def get():
        return {'page':'list', 'method':'get'}

    @staticmethod
    def post():
        return {'page':'list', 'method':'post'}
    
    @staticmethod
    def modify_item():
        data = request.get_json()  
        id = int(data.get("id"))
        new_question = str(data.get("new_question"))
        new_answer = str(data.get("new_answer"))
        try:
            response = Controller().modify_item(id, new_question, new_answer)
            return jsonify(response) 
        except Exception as e:
            return jsonify({'status': False, 'message': str(e)})


    @staticmethod
    def delete_item():
        id_param:int = int(request.args.get('id'))
        try:
            return jsonify(Controller().pop_item(id_param))
        except Exception as e:
            return jsonify({'status': False, 'message': str(e)})