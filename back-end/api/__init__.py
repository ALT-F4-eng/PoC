from flask import Flask

def create_app():
    
    app=Flask(__name__)
    app.config['SECRET_KEY'] = 'secret_key'

    from .test_get_view import test_view
    from .test_similarity import test_similarity
    app.register_blueprint(test_view, url_prefix='/')
    app.register_blueprint(test_similarity, url_prefix='/')
    
    return app