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
            joined_questions:str = "\n".join(sub_questions_set)
            question:str = f"rispondi alle seguente domande nella lingua in cui sono scritte in una unica lista formato python list [str, str, ..]: {joined_questions}"
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": question}],
                web_search = False
            )
            #print(response.choices[0].message.content)
            tmp = self.string_to_list_conv(response.choices[0].message.content)
            answers += tmp
            #print("###################################################")
            #print("lunghezza dataset:", len(sub_questions_set), f"da {index} a {(len(questions)//subdivisions)+index}")
            #print("lista:",tmp)
            #print("###################################################")
            index += len(sub_questions_set)
        #print("###################################################")
        #print("ANSWERS:",answers, "type:", type(answers))
        return answers