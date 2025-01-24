from sentence_transformers import SentenceTransformer, util

class Text_Similarity_model:
    def __init__(self):
        self.set_models:dict[str, function] = {
        'distilbert-base-nli-stsb-mean-tokens':self.calcola_similarita,
        'roberta-large-nli-stsb-mean-tokens':self.calcola_similarita,
        'all-mpnet-base-v2':self.calcola_similarita
        }
        self.models:dict[str, any] = {name: SentenceTransformer(name) for name in self.set_models.keys()}
    

    def calcola_similarita(self, model:any, risposta_attesa:str, risposta_generata:str) -> float:
        embeddings_attesa:any = model.encode(risposta_attesa, convert_to_tensor=True)
        embeddings_generata:any = model.encode(risposta_generata, convert_to_tensor=True)
        similarity:float = util.cos_sim(embeddings_attesa, embeddings_generata).item()
        return similarity
    

    def count_math(self, sentence:str) -> int:
        math_characters:set[str] = set("+-*/%^=<>")
        count_numbers:int = 0
        count_characters:int = 0
        mem_numer:list[str] = []

        for i,character in enumerate(sentence):

            if character.isdigit():
                mem_numer.append(character)

            if (character == " " or character in math_characters or i==len(sentence)-1) and len(mem_numer)>0:
                mem_numer = []
                count_numbers += 1

            if character in math_characters:
                count_characters += 1

        return count_numbers + count_characters
    

    def choose_model(self, answer:str, numbers_math_characters:int) -> str:
        if len(answer.split()) <= 10 and numbers_math_characters<3:
            return list(self.set_models.keys())[0]
        elif  len(answer.split()) <= 20 and len(answer.split()) > 10 or numbers_math_characters>=3:
            return list(self.set_models.keys())[1]
        elif len(answer.split()) > 20 and numbers_math_characters<3:
            return list(self.set_models.keys())[2]
        else:
            return list(self.set_models.keys())[2]
    

    def text_similarity(self, sentence_1:str, sentence_2:str, model_name:str) -> float:
        model:any = self.models[model_name]
        similarity = self.set_models[model_name](model, sentence_1, sentence_2)
        return similarity
    

    def categorize(self, questions:list[str], true_answers:list[str], generated_answers:list[str]) -> list[dict]:
        results:list[dict] = []

        if len(true_answers) != len(generated_answers):
            return results
        
        for i in range(len(true_answers)):
            sentence:str = questions[i] + " " + true_answers[i]
            sentence:str = sentence.replace("\n", "")
            numbers_math_characters:int = self.count_math(sentence)
            model_name:str = self.choose_model(true_answers[i], numbers_math_characters)
            similarity = self.text_similarity(true_answers[i], generated_answers[i], model_name)
            results.append({'domanda':questions[i], 'risposta attesa':true_answers[i], 'risposta generata':generated_answers[i], 'similarità':round(similarity, 2)})
        
        return results