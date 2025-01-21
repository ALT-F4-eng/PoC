import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from backend.model.dataset_model import Dataset_model

class Controller:
    def __init__(self):
        self.dataset:Dataset_model = Dataset_model()
    
    def load(self) -> list[dict[str, str]]:
        return self.dataset.load_json()
    
    def load_questions(self) -> list[str]:
        return self.dataset.load_questions()
    
    def save(self, data) -> dict[str, bool, str, str]:
        return self.dataset.write_json(data)

    def delete(self) -> dict[str, bool, str, str]:
        return self.dataset.delete_json()