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
        datas:list[dict[str, str, str, float]] = Controller().categorize(questions, true_answers, generated_answers)
        similarityes:list[float] = [data[list(data.keys())[len(list(data.keys()))-1]] for data in datas]
        average:float = Controller().get_average(similarityes)
        deviation:float = Controller().get_deviation(similarityes)
        sets_similarity:list[dict[str, float, str, float, str, int]] = Controller().get_classes_of_similarity(similarityes, 5)
        result:dict[float, float, list[dict[str, float, str, float, str, int]], list[dict[str, str, str, float]]] = {'average':average, 'deviation':deviation, 'sets_similarity':sets_similarity, 'couples':datas}
        return jsonify(result)

    @staticmethod
    def get():
        try:
            dataset:list[dict[str, str]] = Controller().load()
            return Test_view.test(dataset)
        except Exception as e:
            return jsonify({'status':False, 'message':str(e)})

    @staticmethod
    def post():
        try:
            dataset:list[dict[str, str]] = request.get_json()
            return Test_view.test(dataset)
        except Exception as e:
            return jsonify({'status':False, 'message':str(e)})