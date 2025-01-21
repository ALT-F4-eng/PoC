from flask import render_template, request
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
from PoC.backend.controller.controller import Controller

class Test_view:
    @staticmethod
    def register(app):
        app.add_url_rule('/test', 'home', Test_view.get, methods=['GET', 'POST'])

    @staticmethod
    def get():
        dataset:dict = Controller().load_questions()
        answers = Controller().ask(dataset) 
        return answers        #DA QUI IN POI

    @staticmethod
    def post():
        return {"message":"Benvenuto! Inserisci qualcosa."}
