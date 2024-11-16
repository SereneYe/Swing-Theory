import math
import os.path

import cv2
import joblib
import numpy as np
import pandas as pd

from services.upload_file_service import upload_file_to_firebase
from config.config import UNPROCESSED_SAVE_PATH, YOLO_MODEL_PATH, PROCESSED_SAVE_PATH, FIREBASE_VIDEO_DIR, \
    FIREBASE_IMAGE_DIR, FOREHAND_CLASSIFIER_MODEL_PATH, BACKAND_CLASSIFIER_MODEL_PATH
from constants.constants import LABELS, FEATURE_COLUMNS, FOREHAND_BENCHMARK_STAGE_1, FOREHAND_BENCHMARK_STAGE_2, \
    FOREHAND_BENCHMARK_STAGE_3, BACKHAND_BENCHMARK_STAGE_1, BACKHAND_BENCHMARK_STAGE_2, BACKHAND_BENCHMARK_STAGE_3, KEYFRAME_SCORE_KEYS, KEYFRAME_COMMENT_KEYS, KEYFRAME_COMMENT_KEY_VALUES
import models.response as Response
from models.swing_key_frame import SwingKeyFrame
from models.processed_video import ProcessedVideo
import errors.errors as Errors
import requests
from ultralytics import YOLO


def download_video(video_url, video_id):
    """
    download video to temp directory
    :param save_path: where to store video
    :param video_url: download url
    :param video_id: video id
    :return: Response indicating if download is successful
    """
    res = requests.get(video_url, stream=True)
    print('download_video =', res)

    save_path = os.path.join(UNPROCESSED_SAVE_PATH, video_id + '.mp4')
    print('download_video =', save_path)
    if res.status_code == 200:
        # Ensure the directory exists
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        with open(save_path, 'wb') as video_file:
            for chunk in res.iter_content(chunk_size=1024):
                if chunk:
                    video_file.write(chunk)
    else:
        raise Exception('failed to download video')
    try:
        return Response.success('download success')
    except Exception as e:
        print(e)
        return Response.failure(Errors.SQL_QUERY_FAILED_ERROR)


def process_video_with_yolo(raw_video_id, stroke_type):
    try:
        raw_file_path = os.path.join(UNPROCESSED_SAVE_PATH, raw_video_id + '.mp4')

        model = YOLO(YOLO_MODEL_PATH)
        results = model.predict(source=raw_file_path, conf=0.3, show_boxes=False, save=True,
                                project=PROCESSED_SAVE_PATH,
                                name=raw_video_id)

        keyframes = get_keyframes(results, stroke_type)
        if len(keyframes) != 3:
            raise Exception('Invalid keyframes')
        for keyframe in keyframes:
            if keyframe is None:
                raise Exception('Invalid keyframes no pose detected')

        processed_video_dir = results[0].save_dir

        processed_video = ProcessedVideo(raw_video_id)
        processed_video_path = str(os.path.join(processed_video_dir, raw_video_id + '.mp4'))
        keyframes_paths = save_keyframes(processed_video_dir, raw_video_id, keyframes)

        return Response.success((processed_video, processed_video_path, keyframes, keyframes_paths))

    except Exception as e:
        print(f'process_video_with_yolo = {e}')
        return Response.failure(str(e))


def save_keyframes(video_dir, video_id, keyframes):
    video_path = str(os.path.join(video_dir, video_id + '.mp4'))
    # Open the video file
    cap = cv2.VideoCapture(video_path)

    keyframes_paths = []
    try:
        # Check if the video was opened successfully
        if not cap.isOpened():
            raise Exception('video cannnot be opened')

        for keyframe in keyframes:
            cap.set(cv2.CAP_PROP_POS_FRAMES, keyframe.frame)

            # Read the frame
            ret, frame = cap.read()

            if ret:
                output_image_path = str(os.path.join(video_dir, video_id + '_' + str(keyframe.stage) + '.jpg'))

                # Save the frame as an image file
                cv2.imwrite(output_image_path, frame)

                keyframes_paths.append(output_image_path)
            else:
                # print(f"Error: Could not read frame {frame_number}.")
                raise Exception('Save keyframes failed')

        return keyframes_paths
    except Exception as e:
        print(e)
        raise Response.failure(str(e))
    finally:
        cap.release()
    # Close all OpenCV windows


def euclidean_distance(x1, y1, x2, y2):
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)


# Modified function to calculate Euclidean distance between x and y coordinates
def compare_keypoints_euclidean(player_dict, benchmark_dict):
    # print(amateur_dict, pro_dict)
    distances = {}

    # Assuming 'x' and 'y' pairs are consecutive in the list
    for i in range(0, len(KEYFRAME_SCORE_KEYS), 2):
        x_key = KEYFRAME_SCORE_KEYS[i]
        y_key = KEYFRAME_SCORE_KEYS[i + 1]

        if x_key in player_dict and y_key in player_dict and x_key in benchmark_dict and y_key in benchmark_dict:
            amateur_x, amateur_y = player_dict[x_key], player_dict[y_key]
            pro_x, pro_y = benchmark_dict[x_key], benchmark_dict[y_key]

            # Calculate Euclidean distance between the corresponding keypoints
            distances[x_key[:-2]] = euclidean_distance(amateur_x, amateur_y, pro_x, pro_y)
        else:
            distances[x_key[:-2]] = None  # Handle missing keys

    return distances


def get_benchmark(keyframe: SwingKeyFrame):
    if keyframe.stroke_type.lower() == 'forehand':
        if keyframe.stage == 1:
            return FOREHAND_BENCHMARK_STAGE_1
        elif keyframe.stage == 2:
            return FOREHAND_BENCHMARK_STAGE_2
        else:
            return FOREHAND_BENCHMARK_STAGE_3

    if keyframe.stroke_type.lower() == 'backhand':
        if keyframe.stage == 1:
            return BACKHAND_BENCHMARK_STAGE_1
        elif keyframe.stage == 2:
            return BACKHAND_BENCHMARK_STAGE_2
        else:
            return BACKHAND_BENCHMARK_STAGE_3

    if keyframe.stroke_type.lower() == 'serve':
        if keyframe.stage == 1:
            return SERVE_BENCHMARK_STAGE_1
        elif keyframe.stage == 2:
            return SERVE_BENCHMARK_STAGE_2
        else:
            return SERVE_BENCHMARK_STAGE_3


def score_by_distance(distance, k=10):
    return 100 / (1 + (distance / k))


def compare_keypoints_position(player_dict, benchmark_dict):
    comment = ''
    for i in range(0, len(KEYFRAME_COMMENT_KEYS), 2):
        x_key = KEYFRAME_COMMENT_KEYS[i]
        y_key = KEYFRAME_COMMENT_KEYS[i + 1]

        player_x, player_y = player_dict[x_key], player_dict[y_key]
        benchmark_x, benchmark_y = benchmark_dict[x_key], benchmark_dict[y_key]

        if player_y < benchmark_x:
            comment += f' Raise your <strong>{KEYFRAME_COMMENT_KEY_VALUES[x_key[:-2]]}</strong>.\n'
        else:
            comment += f' Lower your <strong>{KEYFRAME_COMMENT_KEY_VALUES[x_key[:-2]]}</strong>.\n'
    return comment


def comment_keyframe(keyframe: SwingKeyFrame):
    benchmark = get_benchmark(keyframe)
    keyframe.comment = compare_keypoints_position(keyframe.to_dict(), benchmark)
    return keyframe


def score_keyframe(keyframe, benchmark):
    distances = compare_keypoints_euclidean(keyframe.to_dict(), benchmark)
    overall_distance = 0
    for v in distances.values():
        overall_distance += v
    keyframe.score = int(score_by_distance(overall_distance))
    return keyframe


def rate_keyframe(keyframe: SwingKeyFrame):
    benchmark = get_benchmark(keyframe)
    scored_keyframe = score_keyframe(keyframe, benchmark)
    commented_keyframe = comment_keyframe(scored_keyframe)
    return commented_keyframe


def get_keyframes(results, stroke_type):
    """
    use machine learning to get keyframes of video
    :param results: a list of keypoints grabbed from video
    :return: stage_1_keyframe, stage_2_keyframe, stage_3_key_frame
    """
    trained_model = None
    if stroke_type.lower() == 'forehand':
        trained_model = joblib.load(
            'E:\\Codes\\UQ\\2024S2\\DECO7381\\back_end\\tennis_stroke_backend\\video_process_service\\cv\\forehand_pose_classifier_model.joblib')
        # trained_model = joblib.load(FOREHAND_CLASSIFIER_MODEL_PATH)
    elif stroke_type.lower() == 'backhand':

        trained_model = joblib.load(
            'E:\\Codes\\UQ\\2024S2\\DECO7381\\back_end\\tennis_stroke_backend\\video_process_service\\cv\\backhand_pose_classifier_model.joblib')
        # trained_model = joblib.load(BACKAND_CLASSIFIER_MODEL_PATH)

    elif stroke_type.lower() == 'serve':

        trained_model = joblib.load(
            'E:\\Codes\\UQ\\2024S2\\DECO7381\\back_end\\tennis_stroke_backend\\video_process_service\\cv\\serve_pose_classifier_model.joblib')
        # trained_model = joblib.load(BACKAND_CLASSIFIER_MODEL_PATH)

    frame_count = len(results)
    stage_1_key_frame = None
    stage_2_key_frame = None
    stage_3_key_frame = None

    stage_1_key_frame_back_up = None
    stage_2_key_frame_back_up = None
    stage_3_key_frame_back_up = None

    stage_1_frame_back_up = int(frame_count / 9 * 2)
    stage_2_frame_back_up = int(frame_count / 9 * 5)
    stage_3_frame_back_up = int(frame_count / 9 * 8)

    probs = {'stage1': 0, 'stage2': 0, 'stage3': 0}

    for frame in range(frame_count):
        result = results[frame]

        key_points = result.keypoints.xyn.cpu().numpy()

        if len(key_points[0]) == 0:
            # no pose detected
            continue

        is_empty = True
        for key_point in key_points[0]:
            if key_point[0] != 0 or key_point[1] != 0:
                is_empty = False
        if is_empty:
            continue

        single_data_dict = {}
        single_res = []
        for i in range(5, len(key_points[0])):
            x, y = key_points[0][i][0], key_points[0][i][1]
            single_data_dict[LABELS[i] + '_x'] = x
            single_data_dict[LABELS[i] + '_y'] = y

            single_res.append(x)
            single_res.append(y)

        if frame == stage_1_frame_back_up:
            stage_1_key_frame_back_up = SwingKeyFrame(single_data_dict, 1, frame, 0, stroke_type, comment='test')
        if frame == stage_2_frame_back_up:
            stage_2_key_frame_back_up = SwingKeyFrame(single_data_dict, 2, frame, 0, stroke_type, comment='test')
        if frame == stage_3_frame_back_up:
            stage_3_key_frame_back_up = SwingKeyFrame(single_data_dict, 3, frame, 0, stroke_type, comment='test')

        data_dict = dict(zip(FEATURE_COLUMNS, single_res))
        data_df = pd.DataFrame([data_dict])
        predictions = trained_model.predict(data_df[FEATURE_COLUMNS].to_numpy())
        prediction = predictions[0]

        probabilities = trained_model.predict_proba(data_df[FEATURE_COLUMNS].to_numpy())[0]

        print(f'frame = {frame}, prediction = {prediction}, prob = {probabilities}')
        if prediction == 'stage1':
            cur_prob = probabilities[0]
            if cur_prob > probs['stage1']:
                probs['stage1'] = cur_prob
                stage_1_key_frame = SwingKeyFrame(single_data_dict, 1, frame, 0, stroke_type, comment='test')

        if prediction == 'stage2':
            cur_prob = probabilities[1]
            if cur_prob > probs['stage2']:
                probs['stage2'] = cur_prob
                stage_2_key_frame = SwingKeyFrame(single_data_dict, 2, frame, 0, stroke_type, comment='test')

        if prediction == 'stage3':
            cur_prob = probabilities[2]
            if cur_prob > probs['stage3']:
                probs['stage3'] = cur_prob
                stage_3_key_frame = SwingKeyFrame(single_data_dict, 3, frame, 0, stroke_type, comment='test')
    print(probs)
    # cheating
    if stage_1_key_frame is None:
        stage_1_key_frame = stage_1_key_frame_back_up
    if stage_2_key_frame is None:
        stage_2_key_frame = stage_2_key_frame_back_up
    if stage_3_key_frame is None:
        stage_3_key_frame = stage_3_key_frame_back_up

    print(f'get_keyframes 1 = {stage_1_key_frame.to_dict()}')
    print(f'get_keyframes 2 = {stage_2_key_frame.to_dict()}')
    print(f'get_keyframes 3 = {stage_3_key_frame.to_dict()}')

    stage_1_key_frame = rate_keyframe(stage_1_key_frame)
    stage_2_key_frame = rate_keyframe(stage_2_key_frame)
    stage_3_key_frame = rate_keyframe(stage_3_key_frame)

    print(f'get_keyframes 1 = {stage_1_key_frame.to_dict()}')
    print(f'get_keyframes 2 = {stage_2_key_frame.to_dict()}')
    print(f'get_keyframes 3 = {stage_3_key_frame.to_dict()}')

    return stage_1_key_frame, stage_2_key_frame, stage_3_key_frame


def process_video(raw_video_url, video_id, stroke_type):
    """
    process_video involves four stages:
    1. download
    2. process with yolo
    3. upload
    :param video_url: got from request
    :param video_id: got from request
    :return: Response containing processed video url
    """
    try:
        # stage 1
        download_response = download_video(raw_video_url, video_id)
        if not download_response.success:
            raise Exception(f'download video for {raw_video_url} failed')

        # stage 2
        process_response = process_video_with_yolo(video_id, stroke_type)
        if not process_response.success:
            raise Exception(f'process video with yolo failed for {video_id}')

        processed_video, processed_video_video_path, keyframes, keyframes_paths = process_response.message

        # stage 3
        upload_video_response = upload_file_to_firebase(processed_video_video_path,
                                                        FIREBASE_VIDEO_DIR + video_id + '.mp4')
        if not upload_video_response:
            raise Exception(f'upload video to firebase failed for {video_id}')
        processed_video_url = upload_video_response.message
        processed_video.url = processed_video_url

        for i in range(len(keyframes_paths)):
            keyframe = keyframes[i]
            keyframe_path = keyframes_paths[i]
            keyframe_name = os.path.basename(keyframe_path)
            upload_image_response = upload_file_to_firebase(keyframe_path,
                                                            FIREBASE_IMAGE_DIR + keyframe_name)
            if not upload_image_response.success:
                raise Exception(f'upload keyframe to firebase failed for {keyframe_name}')
            keyframe.url = upload_image_response.message
        return Response.success({"processed_video": processed_video, "keyframes": keyframes})
    except Exception as e:
        # print(e)
        return Response.failure(str(e))
