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
    
    def write_json(self, content: list[dict[str, str]])  -> dict[str, bool, str, str]:
        with open(self.path, 'w', encoding='utf-8') as file:
            json.dump(content, file, ensure_ascii=False, indent=4)
            return {'status': True, 'message':'ok'}

    def delete_json(self) -> dict[str, bool, str, str]:
        os.remove(self.path)
        return {'status': True, 'message':'ok'}
        
    def pop_item(self, id:int) -> dict[str, bool, str, str]:
        data = self.load_json()
        if id < 0 or id >= len(data):
            return {'status': False, 'message':f'id not valid, id min = 0, id max = {len(data)}'}
        _ = data.pop(id)
        self.write_json(data)
        return {'status': True, 'message':'ok'}

    def modify_item(self, id: int, new_question: str, new_answer: str) -> dict[str, bool, str, str]:
        data = self.load_json()
        if id < 0 or id >= len(data):
            return {'status': False, 'message':f'id not valid, id min = 0, id max = {len(data)}'}
        data[id][list(data[id].keys())[0]] = new_question
        data[id][list(data[id].keys())[1]] = new_answer
        self.write_json(data)
        return {'status': True, 'message':'ok'}
    
    def save_item(self, new_question: str, new_answer: str) -> dict[str, bool, str, str]:
        data = self.load_json()
        data.append({'domanda':new_question, 'rispostaAttesa':new_answer})
        self.write_json(data)
        return {'status': True, 'message':'ok'}
