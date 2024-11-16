import json

import requests
from flask import Blueprint, jsonify, request, make_response
from models.user import User
import services.user_service as user_service
import models.response as Response
from db import db

user_router = Blueprint('user_router', __name__)

@user_router.post('/update_user')
def update_user():  # put application's code here
    # Extract query parameters
    try:
        user_id = request.json['user_id']
        left_handed = request.json['user_data']['handPreference'] == 'Left-handed'
        response = user_service.update_user(db, user_id, left_handed)
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()