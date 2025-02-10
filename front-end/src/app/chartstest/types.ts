export interface SetSimilarity {
    upper_bound: number;
    lower_bound: number;
    elements_in_class: number;
  }
  
  export interface Couple {
    question: string;
    trueAnswer: string;
    generatedAnswer: string;
    similarity: number;
  }
  
  export interface JsonResponse {
    average: number;
    deviation: number;
    sets_similarity: SetSimilarity[];
    couples: Couple[];
  }