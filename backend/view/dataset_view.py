from flask import render_template, request, jsonify
import json

class Dataset_view:
    
    @staticmethod
    def register(app):
        app.add_url_rule('/load', 'dataset_loading', Dataset_view.get, methods=['GET'])
        app.add_url_rule('/save', 'dataset_saving', Dataset_view.post, methods=['POST'])

    @staticmethod
    def load_json(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
                return data
        except FileNotFoundError:
            print(f"Errore: Il file '{file_path}' non esiste.")
        except json.JSONDecodeError as e:
            print(f"Errore: Il file '{file_path}' non è un JSON valido. {e}")
        return None

    @staticmethod
    def get():
        data = Dataset_view.load_json('Dataset\dataset.json')
        return jsonify(data)

    @staticmethod
    def post():
        return {"message":"salvataggio avvenuto con successo!"}
