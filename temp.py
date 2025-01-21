import ast

def ask(questions):

    index = 0
    subdivisions = 3
    
    while index<len(questions):
        sub_questions_set = questions[index:(len(questions)//subdivisions)+index]
        print(index, "a", (len(questions)//subdivisions)+index)
        index += len(sub_questions_set)
        print("iterazione fatta", index)

    return "done"

print(ask(['palla', 'volo', 'caca', 'carmine', 'sei', 'sette', 'otto', 'ottttt']))