from g4f.client import Client
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
        client:Client = Client()
        answers:list[str] = []
        index:int = 0
        subdivisions:int = 3
        
        while index<len(questions):
            sub_questions_set:list[str] = questions[index:(len(questions)//subdivisions)+index]
            question:str = f"rispondi alle seguente domande in italiano in formato python list [str, str, ..]: {"\n".join(sub_questions_set)}"
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": question}],
                web_search = False
            )
            answers += self.string_to_list_conv(response.choices[0].message.content)
            index += len(sub_questions_set)

        return answers