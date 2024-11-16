import os

# import redis
# import websocket
import logging
import time
from logging.handlers import RotatingFileHandler
from flask import Flask, request, g
from routers.api_router import api_bp



def create_log(app):
    """
    This is a sample function.

    :param param1: Description of param1
    :type param1: int
    :param param2: Description of param2
    :type param2: str
    :return: Description of return value
    :rtype: bool
    """

    # Get the directory where the script is located
    current_dir = os.path.dirname(os.path.abspath(__file__))
    log_directory = os.path.join(current_dir, 'logs')

    # Create the directory if it doesn't exist
    if not os.path.exists(log_directory):
        os.makedirs(log_directory)
        print(f"Directory '{log_directory}' created successfully.")
    else:
        print(f"Directory '{log_directory}' already exists.")

    log_path = os.path.join(current_dir, 'logs/app.log')

    # Set up file handler
    file_handler = RotatingFileHandler(log_path, maxBytes=10000, backupCount=3)
    file_handler.setLevel(logging.INFO)

    # Set up logging format
    concise_format = '%(asctime)s %(levelname)s [%(remote_addr)s] "%(method)s %(url)s %(status_code)s" in %(pathname)s:%(lineno)d - %(response_time)ss'
    formatter = logging.Formatter(concise_format)
    file_handler.setFormatter(formatter)

    # Add the file handler to the app's logger
    app.logger.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

def create_app():
    app = Flask(__name__)
    # app.register_blueprint(relational_data_service_bp)
    # app.register_blueprint(video_process_service_bp)
    app.register_blueprint(api_bp)

    app.secret_key = "super secret key"
    create_log(app)
    return app

app = create_app()

# Middleware for logging
@app.before_request
def start_timer():
    g.start_time = time.time()

@app.after_request
def log_request(response):
    response_time = round(time.time() - g.start_time, 4)
    print('response_time =', response_time)
    app.logger.info('', extra={
        'remote_addr': request.remote_addr,
        'method': request.method,
        'url': request.url,
        'status_code': response.status_code,
        'response_time': response_time,
    })
    return response


if __name__ == '__main__':
    app.run(debug=False, port=7381, host='0.0.0.0')

