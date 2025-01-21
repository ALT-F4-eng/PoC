import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.model.dataset_model import Dataset_model
from backend.model.LLM_model import LLM_model
from backend.model.text_similarity_model import Text_Similarity_model

class Controller:
    def __init__(self):
        self.dataset:Dataset_model = Dataset_model()
        self.api_llm:LLM_model = LLM_model()
        self.similarity:Text_Similarity_model = Text_Similarity_model()
    
    def load(self) -> list[dict[str, str]]:
        return self.dataset.load_json()
    
    def load_questions(self) -> list[str]:
        return self.dataset.load_questions()
    
    def save(self, data) -> dict[str, bool, str, str]:
        return self.dataset.write_json(data)

    def delete(self) -> dict[str, bool, str, str]:
        return self.dataset.delete_json()
    
    def ask(self, questions:list[str]) -> list[str]:
        return self.api_llm.ask(questions)
    
    def categorize(self, questions:list[str], true_answers:list[str], generated_answers:list[str]) -> list[dict]:
        return self.similarity.categorize(questions, true_answers, generated_answers)

    