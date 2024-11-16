from flask import jsonify
from sqlalchemy import and_
from models.raw_video import RawVideo
from models.processed_video import ProcessedVideo
from models.swing_key_frame import SwingKeyFrame
from models.record import Record
from models.user import User
from models.searched_results import SearchedRecord, SearchedVideo, SearchedStrokeTypeStats, SearchedAllStats
from constants.constants import EXCELLENT_SCORE, GOOD_SCORE, AVERAGE_SCORE
import models.response as Response
import errors.errors as Errors


def search_video_by_user_id(user_id):
    query = RawVideo.query
    conditions = []

    try:
        conditions.append(RawVideo.is_deleted == 0)
        if user_id is not None:
            conditions.append(RawVideo.user_id == user_id)

        if conditions:
            query = query.filter(and_(*conditions))
        videos = query.all()

        results = [video.to_dict() for video in videos]

        return Response.success(results)
    except Exception as e:
        print(e)
        return Response.failure(Errors.SQL_QUERY_FAILED_ERROR)


def insert_record(db, user_id, record_id, stroke_numbers, stroke_type):
    record = Record(user_id=user_id, record_id=record_id, stroke_numbers=stroke_numbers, stroke_type=stroke_type)
    try:
        # Add and commit the new user
        db_record = Record.query.filter_by(record_id=record_id).first()
        if db_record is not None:
            return Response.success('record already existed')

        db.session.add(record)
        db.session.commit()
        return Response.success('successfully inserted into record')
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return Response.failure(f'failed to insert into raw_videos because {e}')
    finally:
        db.session.close()  # Close the session


def insert_raw_video(db, url, user_id, record_id):
    raw_video = RawVideo(url=url, user_id=user_id, record_id=record_id, created_by=user_id, updated_by=user_id)
    try:
        # Add and commit the new user
        db.session.add(raw_video)
        db.session.commit()
        return Response.success('successfully inserted into raw_videos')
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return Response.failure(f'failed to insert into raw_videos because {e}')
    finally:
        db.session.close()  # Close the session


def insert_processed_video_and_keyframes(db, raw_video_id, url, record_id, keyframes):
    processed_video = ProcessedVideo(raw_video_id=raw_video_id, url=url, record_id=record_id)
    try:
        # Add and commit the new user
        db.session.add(processed_video)
        db.session.flush()

        processed_video_id = processed_video.processed_video_id

        for keyframe in keyframes:
            # new_keyframe = SwingKeyFrame()
            new_keyframe = SwingKeyFrame(**keyframe)
            new_keyframe.processed_video_id = processed_video_id
            db.session.add(new_keyframe)

        db.session.commit()

        return Response.success({"processed_video_id": processed_video.processed_video_id})
    except Exception as e:
        print(e)
        db.session.rollback()  # Rollback in case of an error
        return Response.failure('failed to insert processed videos and keyframes')
    finally:
        db.session.close()  # Close the session


def search_swing_key_frames_by_processed_video_id(processed_video_id):
    query = SwingKeyFrame.query
    conditions = []

    try:
        if processed_video_id is not None:
            conditions.append(SwingKeyFrame.processed_video_id == processed_video_id)

        if conditions:
            query = query.filter(and_(*conditions))
        swing_key_frames = query.all()

        return swing_key_frames
    except Exception as e:
        print(f'search_swing_key_frames_by_processed_video_id: {e}')
        return None


def search_processed_video_by_record_id(record_id):
    query = ProcessedVideo.query
    conditions = []

    try:
        conditions.append(ProcessedVideo.is_deleted == 0)
        if record_id is not None:
            conditions.append(ProcessedVideo.record_id == record_id)

        if conditions:
            query = query.filter(and_(*conditions))
        processed_videos = query.all()
        results = []
        for processed_video in processed_videos:
            searched_video = SearchedVideo(processed_video.processed_video_id, processed_video.url)
            swing_key_frames = search_swing_key_frames_by_processed_video_id(searched_video.processed_video_id)

            searched_video.swing_key_frames = swing_key_frames
            searched_video.set_average_score()

            results.append(searched_video)
        return results
    except Exception as e:
        print(f'search_processed_video_by_record_id: {e}')
        return None


def _get_average_score_of_record(videos):
    if len(videos) == 0:
        return 0

    score = 0
    for video in videos:
        score += video.score

    return int(score / len(videos))


def search_all_records(db, user_id, stroke_type):
    query = Record.query
    conditions = []

    try:
        conditions.append(Record.is_deleted == 0)
        if user_id is not None:
            conditions.append(Record.user_id == user_id)
        if stroke_type is not None:
            conditions.append(Record.stroke_type == stroke_type)

        if conditions:
            query = query.filter(and_(*conditions))
        records = query.all()
        # print(f'search_all_records: {len(records)}')

        results = []

        for record in records:
            searched_record = SearchedRecord(user_id, record.record_id, record.stroke_type,
                                             record.stroke_numbers, record.created_date)
            # print(searched_record.to_dict())

            videos = search_processed_video_by_record_id(searched_record.record_id)
            searched_record.videos = videos
            searched_record.record_score = _get_average_score_of_record(videos)
            # print(f'search_all_records = {searched_record.to_dict()}')
            results.append(searched_record)

        return Response.success(results)
    except Exception as e:
        print(f'search_all_records: {e}')
        return Response.failure(Errors.SQL_QUERY_FAILED_ERROR)


def search_record(db, user_id, record_id):
    query = Record.query
    conditions = []
    print(f'search_record user_id = {user_id}, record_id = {record_id}')

    try:
        conditions.append(Record.is_deleted == 0)
        if record_id is not None:
            conditions.append(Record.record_id == record_id)

        if conditions:
            query = query.filter(and_(*conditions))
        records = query.all()
        results = []

        for record in records:
            searched_record = SearchedRecord(user_id, record.record_id, record.stroke_type,
                                             record.stroke_numbers, record.created_date)

            videos = search_processed_video_by_record_id(searched_record.record_id)
            searched_record.videos = videos
            searched_record.record_score = _get_average_score_of_record(videos)
            searched_record.correct_turns = _get_correct_turns(videos)

            results.append(searched_record.to_dict())

        return Response.success(results[0])
    except Exception as e:
        print(f'search_record: {e}')
        return Response.failure(Errors.SQL_QUERY_FAILED_ERROR)


def search_stats_by_stroke_type(db, user_id, stroke_type):
    try:
        searched_records_response = search_all_records(db, user_id, stroke_type)
        if not searched_records_response.success:
            raise Exception(f'search_stats_by_stroke_type failed during search_all_records')

        searched_records = searched_records_response.message

        total_time = 0
        total_practice_turns = 0
        max_score = 0
        total_score = 0
        performance_details = {"Excellent": 0, "Good": 0, "Average": 0, "Poor": 0}
        past_scores = []

        for searched_record in searched_records:
            practice_turns = searched_record.stroke_numbers
            total_time += practice_turns * 3
            total_practice_turns += practice_turns

            for video in searched_record.videos:
                score = video.score
                total_score += score
                max_score = max(score, max_score)
                _update_performance_details(performance_details, score)

                past_scores = [score] + past_scores

        average_score = total_score / total_practice_turns if total_practice_turns != 0 else 0

        searched_stroke_type_stats = SearchedStrokeTypeStats(stroke_type, average_score, total_practice_turns,
                                                             total_time, max_score, performance_details, past_scores)

        return Response.success(searched_stroke_type_stats)
    except Exception as e:
        print(f'search_stats_by_stroke_type: {e}')
        return Response.failure(Errors.SQL_QUERY_FAILED_ERROR)


def search_all_stats(db, user_id):
    try:
        searched_records_response = search_all_records(db, user_id, None)
        if not searched_records_response.success:
            raise Exception(f'search_stats_by_stroke_type failed during search_all_records')

        searched_records = searched_records_response.message
        total_stroke_numbers = 0
        forehand_stroke_numbers = 0
        backhand_stroke_numbers = 0
        serve_stroke_numbers = 0

        for searched_record in searched_records:
            stroke_numbers = searched_record.stroke_numbers
            stroke_type = searched_record.stroke_type.lower()
            total_stroke_numbers += stroke_numbers
            if stroke_type == 'forehand':
                forehand_stroke_numbers += stroke_numbers
            elif stroke_type == 'backhand':
                backhand_stroke_numbers += stroke_numbers
            else:
                serve_stroke_numbers += serve_stroke_numbers

        searched_all_stats = SearchedAllStats(total_stroke_numbers, forehand_stroke_numbers, backhand_stroke_numbers,
                                              serve_stroke_numbers)

        return Response.success(searched_all_stats)
    except Exception as e:
        print(f'search_stats_by_stroke_type: {e}')
        return Response.failure(Errors.SQL_QUERY_FAILED_ERROR)

def delete_record(db, record_id):
    try:
        record = Record.query.get(record_id)
        if record:
            record.is_deleted = 1
            db.session.commit()

        return Response.success(f'Record {record_id} has been deleted')
    except Exception as e:
        print(f'delete_record = {e}')
        return Response.failure(e)


def _update_performance_details(performance_details, score):
    if score >= EXCELLENT_SCORE:
        performance_details['Excellent'] += 1
    elif score >= GOOD_SCORE:
        performance_details['Good'] += 1
    elif score >= AVERAGE_SCORE:
        performance_details['Average'] += 1
    else:
        performance_details['Bad'] += 1


def _get_correct_turns(videos):
    correct_turns = 0
    for video in videos:
        if video.score >= 60:
            correct_turns += 1
    return correct_turns
