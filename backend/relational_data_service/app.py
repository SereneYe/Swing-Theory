import logging
import os
from logging.handlers import RotatingFileHandler
from db import db
from flask import Flask, request, g
import time
from flask_mysqldb import MySQL
from flask_restx import Resource, Api
import pymysql

from routers.video_router import video_router
from routers.user_router import user_router
from config.config import DATABASE_URL


def create_log(app):
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

    # pymysql.install_as_MySQLdb()
    app.config['SQLALCHEMY_DATABASE_URI'] = f'{DATABASE_URL}/tennis_stroke_process'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    app.register_blueprint(video_router)
    app.register_blueprint(user_router)

    with app.app_context():
        db.create_all()
        print('All tables created successfully')

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
    app.logger.info('', extra={
        'remote_addr': request.remote_addr,
        'method': request.method,
        'url': request.url,
        'status_code': response.status_code,
        'response_time': response_time,
    })
    return response

if __name__ == '__main__':

    # app.run(host='0.0.0.0', port=5001)
    app.run(port=5001,debug=False)
