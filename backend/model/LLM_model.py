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
            messages=[{"role": "user", "content": f"Rispondi direttamente alle seguenti domande, usando la stessa lingua della domanda, senza introduzione: {sentence}"}],
            web_search = False
        )
        reply = response.choices[0].message.content.strip()
        print(reply)
        return reply

#specificare la lingua in italiano per le risposte llm
#passare al llm solo le domande dal json e fare tornare solo le risposte