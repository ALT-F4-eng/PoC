import json
import os

class Dataset_model:

    #_instance = None 

    #def __new__(cls, path="./PoC/backend/model/Dataset/dataset.json"):
    #    if cls._instance is None:
    #        cls._instance = super(Dataset_model, cls).__new__(cls)
    #        cls._instance.path = path  
    #    return cls._instance

    def __init__(self, path="./backend/model/Dataset/dataset.json"):  
        self.path = path
         # Calcola il percorso assoluto basandoti sulla posizione della cartella di lavoro
        #self.path = os.path.abspath(path)

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
    
    def load_questions(self):
        data = self.load_json()
        # Se il file contiene una lista di oggetti
        if isinstance(data, list):
            return [item["domanda"] for item in data if "domanda" in item]
        else:
            print("Errore: Il file JSON non contiene una lista di oggetti.")
        return []