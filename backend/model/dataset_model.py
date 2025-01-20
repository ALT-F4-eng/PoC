import json

class Dataset_model:

    #_instance = None 

    #def __new__(cls, path="./PoC/backend/model/Dataset/dataset.json"):
    #    if cls._instance is None:
    #        cls._instance = super(Dataset_model, cls).__new__(cls)
    #        cls._instance.path = path  
    #    return cls._instance

    def __init__(self, path="./PoC/backend/model/Dataset/dataset.json"):
        self.path = path

    def load_json(self):
        try:
            with open(self.path, 'r', encoding='utf-8') as file:
                data = json.load(file)
                return data
        except FileNotFoundError:
            print(f"Errore: Il file '{self.path}' non esiste.")
        except json.JSONDecodeError as e:
            print(f"Errore: Il file '{self.path}' non è un JSON valido. {e}")
        return {}