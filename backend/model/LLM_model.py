#from g4f.client import Client
from google import genai
import ast

class LLM_model:
    def __init__(self):
        pass

    def string_to_list_conv(self, response:str) -> list[str]:
        start:int = response.index('[')
        end:int = response.rindex(']')
        list_content:str = response[start:end + 1]
        extracted_list:list[str] = ast.literal_eval(list_content)
        return extracted_list

    def ask(self, questions:list[str]) -> list[str]:
        client = genai.Client(api_key="AIzaSyC9ogTzdhtUCc8XjxEDwvfIL6uv58rojt4")
        answers:list[str] = []
        index:int = 0
        subdivisions:int = 3
        tmp_subseq:list[str] = []
        
        while index<len(questions):
            sub_questions_set:list[str] = questions[index:(len(questions)//subdivisions)+index]
            instruction:str = "rispondi alle seguente domande nella lingua in cui sono scritte in una unica lista formato python list [str, str, ..]"
            question:str = f"{sub_questions_set}"
            response = client.models.generate_content(
                model="gemini-2.0-flash", contents=f"{instruction}: {question}"
            )
            response = response.text
            tmp = self.string_to_list_conv(response)
            answers += tmp
            index += len(sub_questions_set)
        return answers