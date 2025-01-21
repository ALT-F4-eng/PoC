from flask import request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.controller.controller import Controller

class Test_view:
    @staticmethod
    def register(app):
        app.add_url_rule('/test', 'test_get', Test_view.get, methods=['GET'])
        app.add_url_rule('/test', 'test_post', Test_view.post, methods=['POST'])

    @staticmethod
    def test(dataset):
        questions:list[str] = [couples[list(couples.keys())[0]] for couples in dataset]
        true_answers:list[str] = [couples[list(couples.keys())[1]] for couples in dataset]
        generated_answers:list[str]= Controller().ask(questions)
        data:list[dict[str, str, str, float]] = Controller().categorize(questions, true_answers, generated_answers)
        return jsonify(data)

    @staticmethod
    def get():
        dataset:list[dict[str, str]] = Controller().load()
        return Test_view.test(dataset)

    @staticmethod
    def post():
        dataset:list[dict[str, str]] = request.get_json()
        return Test_view.test(dataset)
