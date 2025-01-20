from g4f.client import Client

class LLM_model:

    #_instance = None 

    #def __new__(cls):
    #    if cls._instance is None:
    #        cls._instance = super(LLM_model, cls).__new__(cls) 
    #    return cls._instance

    def __init__(self):
        pass

    def ask(self, sentence):
        
        client = Client()
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": sentence}],
            web_search = False
        )
        print(response.choices[0].message.content)
