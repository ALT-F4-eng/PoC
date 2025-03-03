from flask import request, jsonify
import sys
import os
import time
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.controller.controller import Controller

class Dataset_view:
    
    @staticmethod
    def register(app):
        app.add_url_rule('/dataset/load', 'dataset_loading', Dataset_view.get, methods=['GET'])
        app.add_url_rule('/dataset/pop_item', 'dataset_popping', Dataset_view.pop_item, methods=['GET'])#elimina
        app.add_url_rule('/dataset/modify_item', 'dataset_modifying', Dataset_view.modify_item, methods=['POST'])#modifica
        app.add_url_rule('/dataset/save_item', 'dataset_saving', Dataset_view.save_item, methods=['POST'])#aggiungi
        app.add_url_rule('/dataset/save', 'dataset_saving_post', Dataset_view.post, methods=['POST'])
        app.add_url_rule('/dataset/delete', 'dataset_deleting', Dataset_view.delete, methods=['DELETE'])

    @staticmethod
    def get():
        try:
            data:list[dict[str, str]] = Controller().load()
        except Exception as e:
            return jsonify({'status': False, 'message': str(e)})
        return jsonify(data)

    @staticmethod
    def post():
        try:
            return jsonify(Controller().save(request.get_json()))
        except Exception as e:
            return jsonify({'status': False, 'message': str(e)})
    
    @staticmethod
    def delete():
        try:
            return jsonify(Controller().delete())
        except Exception as e:
            return jsonify({'status': False, 'message': str(e)})
    
    @staticmethod
    def pop_item():
        id_param:int = int(request.args.get('id'))
        try:
            return jsonify(Controller().pop_item(id_param))
        except Exception as e:
            return jsonify({'status': False, 'message': str(e)})

    @staticmethod
    def modify_item():
        data:any = request.get_json()
        id:int = int(data.get("id"))
        new_question:str = str(data.get("new_question"))
        new_answer:str = str(data.get("new_answer"))
        try:
            jsonify(Controller().modify_item(id, new_question, new_answer))
        except Exception as e:
            jsonify({'status': False, 'message': str(e)})
    
    @staticmethod
    def save_item():
        data:any = request.get_json()
        new_question:str = str(data.get("new_question"))
        new_answer:str = str(data.get("new_answer"))
        try:
            jsonify(Controller().save_item(new_question, new_answer))
        except Exception as e:
            jsonify({'status': False, 'message': str(e)})