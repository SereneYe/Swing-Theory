import json

from flask import request, Blueprint, jsonify
import requests
from flask_restx import Api, Resource, fields
from config.config import VIDEO_PROCESS_SERVICE
from config.config import RELATIONAL_DATA_SERVICE

api_bp = Blueprint('api_bp', __name__, url_prefix='/')
api = Api(api_bp, version='1.0', title='API', description='All API')

# standard model to be returned
model = api.model('Response', {
    'message': fields.Raw(required=True, description='The response message'),
    'success': fields.Boolean(required=True, description='The response is successful or not')
})

#################################################################################
# relational_database related api
relational_database_api = api.namespace('relational_database', description='relational_database_service')


@relational_database_api.route('/get_videos_by_user')
class GetVideosByUser(Resource):
    get_videos_by_user_request_model = api.model('request_model', {
        'user_id': fields.String(required=True, description='Required user id'),
    })

    @relational_database_api.expect(get_videos_by_user_request_model)
    @relational_database_api.marshal_with(model, code=201)
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}get_videos_by_user_id',
                                  json=request.json))
        return response.json(), 201


@relational_database_api.route('/add_processed_results')
class AddProcessedResults(Resource):
    @relational_database_api.marshal_with(model, code=201)
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}add_processed_results',
                                  json=request.json))
        return response.json(), 201


#################################################################################
# video_process related api
video_process_api = api.namespace('video_process', description='video_process_service')


@video_process_api.route('/process_video')
class ProcessVideo(Resource):
    process_video_request_model = api.model('request_model', {
        'video_id': fields.String(required=True, description='Requested video id'),
        'video_url': fields.String(required=True, description='Requested video url'),
        'record_id': fields.String(required=True, description='Requested video record id'),
        'user_id': fields.String(required=True, description='Requested user id'),
        'round_id': fields.String(required=True, description='Requested user id')
    })

    @video_process_api.expect(process_video_request_model)
    @video_process_api.marshal_with(model, code=201)
    def post(self):
        record_response = (requests.post(f'{RELATIONAL_DATA_SERVICE}add_record', json=request.json))
        print('json =', request.json)
        record_response = record_response.json()

        if not record_response['success']:
            return record_response, 201

        raw_response = (requests.post(f'{RELATIONAL_DATA_SERVICE}add_raw_video', json=request.json))
        raw_response = raw_response.json()

        if not raw_response['success']:
            return raw_response, 201

        response = (requests.post(f'{VIDEO_PROCESS_SERVICE}process_video',
                                  json=request.json))
        response = response.json()

        # failed to process video
        if not response['success']:
            return response, 201

        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}add_processed_results',
                                  json=json.dumps(response['message'])))

        return response.json(), 201


#################################################################################
# history related api
history_api = api.namespace('history', description='history_process_service')


@history_api.route('/get_all_records')
class GetAllRecords(Resource):
    get_all_records_model = api.model('get_all_records_model', {
        'user_id': fields.String(required=True, description='Requested user id')
    })

    @history_api.expect(get_all_records_model)
    @history_api.marshal_with(model, code=201)
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}get_all_records', json=request.json))
        return response.json(), 201

@history_api.route('/get_record')
class GetRecord(Resource):
    get_record_model = api.model('get_record_model', {
        'record_id': fields.String(required=True, description='Requested record id'),
        'user_id': fields.String(required=True, description='Requested user id')
    })

    @history_api.expect(get_record_model)
    @history_api.marshal_with(model, code=201)
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}get_record', json=request.json))

        return response.json(), 201

@history_api.route('/get_stats_by_stroke_type')
class GetStatsByStrokeType(Resource):
    get_stats_by_stroke_type_model = api.model('get_stats_by_stroke_type_model', {
        'user_id': fields.String(required=True, description='Requested user id'),
        'stroke_type': fields.String(required=True, description='Requested stroke type'),
    })

    @history_api.expect(get_stats_by_stroke_type_model)
    @history_api.marshal_with(model, code=201)
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}get_stats_by_stroke_type', json=request.json))
        return response.json(), 201

@history_api.route('/get_all_stats')
class GetAllStats(Resource):
    get_all_stats_model = api.model('get_all_stats_model', {
        'user_id': fields.String(required=True, description='Requested user id')
    })

    @history_api.expect(get_all_stats_model)
    @history_api.marshal_with(model, code=201)
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}get_all_stats', json=request.json))
        return response.json(), 201


@history_api.route('/delete_record')
class DeleteRecord(Resource):
    delete_record_model = api.model('delete_record_model', {
        'record_id': fields.String(required=True, description='Requested record id')
    })

    @history_api.expect(delete_record_model)
    @history_api.marshal_with(model, code=201)
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}delete_record', json=request.json))
        return response.json(), 201


#################################################################################
# user related api
user_api = api.namespace('user', description='user_service')

@user_api.route('/add_user')
class AddUser(Resource):
    add_user_model = api.model('add_user_model', {
        'user_id': fields.String(required=True, description='Requested user id')
    })

    @user_api.expect(add_user_model)
    @user_api.marshal_with(model, code=201)
    # TODO:
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}add_user', json=request.json))

        return response.json(), 201

@user_api.route('/update_user')
class UpdateUser(Resource):
    update_user_model = api.model('update_user_model', {
        'user_id': fields.String(required=True, description='Requested user id'),
        'left_handed': fields.Boolean(required=True, description='Requested left handed'),
    })

    @user_api.expect(update_user_model)
    @user_api.marshal_with(model, code=201)
    # TODO:
    def post(self):
        response = (requests.post(f'{RELATIONAL_DATA_SERVICE}update_user', json=request.json))
        print(f'update_user = {request.json}')
        return response.json(), 201


api.add_namespace(user_api)
api.add_namespace(history_api)
api.add_namespace(relational_database_api)
api.add_namespace(video_process_api)
