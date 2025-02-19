from flask import Flask
from view.home_view import Home_view
from view.test_view import Test_view
from view.dataset_view import Dataset_view
app = Flask(__name__)

Home_view.register(app)
Test_view.register(app)

Dataset_view.register(app)

if __name__ == '__main__':
    app.run(debug=True)
