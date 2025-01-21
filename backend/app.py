from flask import Flask
from view.dataset_view import Dataset_view

app = Flask(__name__)

Dataset_view.register(app)

if __name__ == '__main__':
    app.run(debug=True)