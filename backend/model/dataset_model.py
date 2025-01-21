import json
import os

class Dataset_model:
    def __init__(self, path:str="./backend/model/Dataset/dataset.json"):  
        self.path:str = path

    def load_json(self) -> list[dict[str, str]]:
        try:
            with open(self.path, 'r', encoding='utf-8') as file:
                data:list[dict[str, str]] = json.load(file)
                return data
        except FileNotFoundError:
            print(f"Errore: Il file '{self.path}' non esiste.")
        except json.JSONDecodeError as e:
            print(f"Errore: Il file '{self.path}' non è un JSON valido. {e}")
        return []
    
    def load_questions(self) -> list[str]:
        data:list[dict[str, str]] = self.load_json()
        if isinstance(data, list):
            return [item["domanda"] for item in data if "domanda" in item]
        else:
            print("Errore: Il file JSON non contiene una lista di oggetti.")
        return []
    
    def write_json(self, content: list[dict[str, str]])  -> dict[str, bool, str, str]:
        try:
            with open(self.path, 'w', encoding='utf-8') as file:
                json.dump(content, file, ensure_ascii=False, indent=4)
                return {'status': True, 'error':''}
        except Exception as e:
            return {'status': False, 'error': e}

    def delete_json(self) -> dict[str, bool, str, str]:
        try:
            if os.path.exists(self.path):
                os.remove(self.path)
                return {'status': True, 'error':''}
            else:
                return {'status': False, 'error':'file doesn\'t exist'}
        except Exception as e:
            return {'status': False, 'error':e}