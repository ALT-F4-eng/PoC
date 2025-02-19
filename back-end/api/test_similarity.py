from flask import Blueprint, request, jsonify
from json.decoder import JSONDecodeError

test_similarity = Blueprint('test_similarity', __name__)
# Simulazione di una funzione di similarità che restituirà un valore numerico fittizio
def similarity_test(expected_answer, real_answer):
    # Simulazione del calcolo della similarità (questa funzione va definita meglio in futuro)
    return round(len(set(expected_answer.split()) & set(real_answer.split())) / len(set(expected_answer.split())), 2)

# Simulazione di una funzione che genera una risposta a una domanda (simulazione di un LLM)
def generate_response(expected_answer):
    if expected_answer == "risposta non generata": 
        return "risposta generata"
    else:
        return expected_answer + " - generata"

@test_similarity.route('/calculate-similarity', methods=['GET', 'POST'])
def calculate_similarity():
    if request.method == 'POST': 
        try:
            data = request.get_json()  # Si assume che i dati arrivino come JSON

            if not isinstance(data, list):
                return jsonify({"error": "Invalid input format. Expected a dictionary of question and expected_answer pairs."}), 400

            results = []
            for pair in data:
                question = pair.get('question')
                expected_answer = pair.get('expected_answer')

                if not all([question, expected_answer]):
                    return jsonify({"error": "Each pair must contain 'question' and 'expected_answer'."}), 400

                real_answer = generate_response(expected_answer)
                similarity = similarity_test(expected_answer, real_answer)
                results.append({
                    'question': question,
                    'expected_answer': expected_answer,
                    'real_answer': real_answer,
                    'similarity': similarity
                })

            return jsonify(results), 200

        except JSONDecodeError as e:
            return jsonify({"error": str(e)}), 500
    
    if request.method == 'GET':
        return jsonify({"request": "get method"}), 200