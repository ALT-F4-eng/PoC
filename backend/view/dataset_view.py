from flask import request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.controller.controller import Controller

class Dataset_view:
    
    @staticmethod
    def register(app):
        app.add_url_rule('/dataset/load', 'dataset_loading', Dataset_view.get, methods=['GET'])
        app.add_url_rule('/dataset/save', 'dataset_saving', Dataset_view.post, methods=['POST'])
        app.add_url_rule('/dataset/delete', 'dataset_deleting', Dataset_view.delete, methods=['DELETE'])

    @staticmethod
    def get():
        data = Controller().load()
        return jsonify(data)

    @staticmethod
    def post():
        data:list[dict[str, str]] = Controller().save(request.get_json()) 
        return jsonify(data)
    
    @staticmethod
    def delete():
        data = Controller().delete()
        return jsonify(data)