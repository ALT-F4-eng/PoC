from flask import Flask
from view.test_view import Test_view

app = Flask(__name__)

Test_view.register(app)

if __name__ == '__main__':
    app.run(debug=True)