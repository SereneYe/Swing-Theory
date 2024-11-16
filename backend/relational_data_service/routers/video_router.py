import json

import requests
from flask import Blueprint, jsonify, request, make_response
from models.raw_video import RawVideo
from models.processed_video import ProcessedVideo
from models.swing_key_frame import SwingKeyFrame
from models.record import Record
from models.user import User
import services.video_service as video_service
import services.user_service as user_service
import models.response as Response
from db import db

video_router = Blueprint('video_router', __name__)

@video_router.post('/get_videos_by_user_id')
def get_videos_by_user_id():  # put application's code here
    # Extract query parameters
    try:

        user_id = request.json['user_id']
        response = video_service.search_video_by_user_id(user_id)
        # return response
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()

@video_router.post('/add_processed_results')
def add_processed_results():  # put application's code here
    try:
        # Extract query parameters
        message = _convert_request_message_to_dict(request)

        processed_video = message['processed_video']

        raw_video_id = processed_video['raw_video_id']
        url = processed_video['url']
        record_id = message["record_id"]

        keyframes = message['keyframes']
        response = video_service.insert_processed_video_and_keyframes(db, raw_video_id, url, record_id, keyframes)

        # response = video_service.search_video_by_user_id(user_id)
        # return response
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()

@video_router.post('/add_record')
def add_record():
    try:
        data = request.json
        user_id = data['user_id']
        record_id = data['record_id']
        stroke_numbers = data['stroke_numbers']
        stroke_type = data['stroke_type']



        response = video_service.insert_record(db, user_id, record_id, stroke_numbers, stroke_type)

        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()


@video_router.post("/add_raw_video")
def add_raw_video():
    try:
        data = request.json

        user_id = data['user_id']

        # user_response = user_service.add_user(db, user_id)
        # print(user_response.to_dict())
        # if not user_response.success:
        #     return  user_response
        url = data['url']
        record_id = data['record_id']
        response = video_service.insert_raw_video(db, url, user_id, record_id)
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()

@video_router.post("/get_all_records")
def get_all_records():
    try:
        data = request.json
        user_id = data['user_id']
        response = video_service.search_all_records(db, user_id, None)

        new_message = []
        for record in response.message:
            new_message.append(record.to_dict())
        response.message = new_message
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()

@video_router.post("/get_record")
def get_record():
    try:
        data = request.json
        record_id = data['record_id']
        user_id = data['user_id']
        response = video_service.search_record(db, user_id, record_id)
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()

@video_router.post("/get_all_stats")
def get_all_stats():
    try:
        data = request.json
        user_id = data['user_id']
        response = video_service.search_all_stats(db, user_id)

        response.message = response.message.to_dict()
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()

@video_router.post("/get_stats_by_stroke_type")
def get_stats_by_stroke_type():
    try:
        data = request.json
        stroke_type = data['stroke_type']
        user_id = data['user_id']
        response = video_service.search_stats_by_stroke_type(db, user_id, stroke_type)
        response.message = response.message.to_dict()
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()

@video_router.post("/delete_record")
def delete_record():
    try:
        data = request.json
        record_id = data['record_id']
        response = video_service.delete_record(db, record_id)
        return response.to_dict()
    except Exception as e:
        return Response.failure(e.__repr__()).to_dict()


def _convert_request_message_to_dict(request):
    message = request.json
    message = message.replace("'", '"')
    message = json.loads(message)
    return message