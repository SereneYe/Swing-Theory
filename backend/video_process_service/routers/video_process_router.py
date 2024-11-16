from flask import Blueprint, jsonify, request


import services.video_process_service as video_process_service
import models.response as Response

video_process_router = Blueprint('video_router', __name__)


@video_process_router.post('/process_video')
def process_video():  # put application's code here
    # Extract query parameters
    video_id = request.json['video_id']
    video_url = request.json['url']
    record_id = request.json['record_id']
    stroke_type = request.json['stroke_type']

    process_response = video_process_service.process_video(video_url, video_id, stroke_type)

    print(f'process_response = {process_response}')
    if not process_response.success:
        print(Response.failure(process_response.message).to_dict())
        return Response.failure(process_response.message).to_dict()

    process_results = process_response.message

    processed_video = process_results["processed_video"]
    keyframes = process_results["keyframes"]
    new_key_frames = []
    for keyframe in keyframes:
        new_key_frames.append(keyframe.to_dict())
    process_results["processed_video"] = processed_video.to_dict()
    process_results["keyframes"] = new_key_frames
    process_results["record_id"] = record_id

    return Response.success(process_results).to_dict()

@video_process_router.post("/add_videos_by_user_id")
def add_videos_by_user_id():
    data = request.json

    creator = data['creator']

    return jsonify(Response.success("shou dao le").to_dict())