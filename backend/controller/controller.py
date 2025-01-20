import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
from PoC.backend.model.dataset_model import Dataset_model
from PoC.backend.model.LLM_model import LLM_model

class Controller:
    def __init__(self):
        self.dataset = Dataset_model()
        self.api_llm = LLM_model()
    
    def load(self):
        return self.dataset.load_json()
    