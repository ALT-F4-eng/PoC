import json
import os

class Dataset_model:
    def __init__(self, path:str="./backend/model/Dataset/dataset.json"):  
        self.path:str = path

    def load_json(self) -> list[dict[str, str]]:
        with open(self.path, 'r', encoding='utf-8') as file:
            data:list[dict[str, str]] = json.load(file)
            return data
    
    def load_questions(self) -> list[str]:
        data:list[dict[str, str]] = self.load_json()
        return [item["domanda"] for item in data if "domanda" in item]