from datetime import datetime, timedelta


class SearchedRecord:
    def __init__(self, user_id, record_id, stroke_type, stroke_numbers, created_date: datetime, videos=None,
                 record_score=0, correct_turns=0):
        self.user_id = user_id
        self.record_id = record_id
        self.stroke_type = stroke_type
        self.stroke_numbers = stroke_numbers
        self.created_date = created_date,
        self.videos = videos
        self.record_score = record_score
        self.correct_turns = correct_turns

    def to_dict(self):
        return {
            "userId": self.user_id,
            "recordId": self.record_id,
            "title": f'{self.stroke_type} Practice for {self.stroke_numbers} turns',
            "recordScore": self.record_score,
            "recordType": self.stroke_type,
            "recordTurns": self.stroke_numbers,
            "correctTurns": self.correct_turns,
            # TODO: change to real url
            # "record_url": "https://www.youtube.com/watch?v=E5Vg8OH-h3g",
            "record_url": self.videos[0].video_url,
            "created_date": self.created_date[0].strftime("%Y-%m-%d %H:%M:%S"),
            "video": [video.to_dict() for video in self.videos] if self.videos is not None else ''
        }


class SearchedVideo:
    def __init__(self, processed_video_id, video_url, swing_key_frames=None, score=0, type='Forehand'):
        self.processed_video_id = processed_video_id
        self.video_url = video_url
        self.swing_key_frames = swing_key_frames,
        self.score = score

    def set_average_score(self):
        if self.swing_key_frames is not None and len(self.swing_key_frames) == 3:
            score = int((self.swing_key_frames[0].score + self.swing_key_frames[1].score + self.swing_key_frames[
                2].score) / len(self.swing_key_frames))
            self.score = score
        else:
            self.score = 0

    def to_dict(self):
        self.set_average_score()
        if self.swing_key_frames is not None and len(self.swing_key_frames) == 3:
            return {
                "processed_video_id": self.processed_video_id,
                "video_url": self.video_url,
                "image_url1": self.swing_key_frames[0].url,
                "image_url2": self.swing_key_frames[1].url,
                "image_url3": self.swing_key_frames[2].url,
                "instruction1": self.swing_key_frames[0].comment,
                "instruction2": self.swing_key_frames[1].comment,
                "instruction3": self.swing_key_frames[2].comment,
                "score1": self.swing_key_frames[0].score,
                "score2": self.swing_key_frames[1].score,
                "score3": self.swing_key_frames[2].score,
                "score": self.score
            }
        else:
            return {
                "processed_video_id": self.processed_video_id,
                "video_url": self.video_url,
                "image_url1": '',
                "image_url2": '',
                "image_url3": '',
                "instruction1": '',
                "instruction2": '',
                "instruction3": '',
                "score1": 0,
                "score2": 0,
                "score3": 0,
                "score": self.score
            }


class SearchedAllStats:
    def __init__(self, total_stroke_numbers, forehand_stroke_numbers, backhand_stroke_numbers, serve_stroke_numbers):
        self.total_stroke_numbers = total_stroke_numbers
        self.forehand_stroke_numbers = forehand_stroke_numbers
        self.backhand_stroke_numbers = backhand_stroke_numbers
        self.serve_stroke_numbers = serve_stroke_numbers
        self.forehand_stroke_percent = int(
            forehand_stroke_numbers / total_stroke_numbers) * 100 if total_stroke_numbers != 0 else 0
        self.backhand_stroke_percent = int(
            backhand_stroke_numbers / total_stroke_numbers) * 100 if total_stroke_numbers != 0 else 0
        self.serve_stroke_percent = int(
            serve_stroke_numbers / total_stroke_numbers) * 100 if total_stroke_numbers != 0 else 0

    def to_dict(self):
        return {
            "total_stroke_numbers": self.total_stroke_numbers,
            "forehand_stroke_numbers": self.forehand_stroke_numbers,
            "backhand_stroke_numbers": self.backhand_stroke_numbers,
            "serve_stroke_numbers": self.serve_stroke_numbers,
            "forehand_stroke_percent": self.forehand_stroke_percent,
            "backhand_stroke_percent": self.backhand_stroke_percent,
            "serve_stroke_percent": self.serve_stroke_percent
        }


class SearchedStrokeTypeStats:
    def __init__(self, stroke_type, average_score=0, practice_turns=0, total_time=0, max_score=0,
                 performance_details=None, past_scores=None):
        self.stroke_type = stroke_type
        self.average_score = average_score
        self.practice_turns = practice_turns
        self.total_time = total_time
        self.max_score = max_score
        self.performance_details = performance_details
        self.past_scores = past_scores

    def to_dict(self):
        return {
            "type": self.stroke_type,
            "averageScore": self.average_score,
            "practiceTurns": self.practice_turns,
            "totalTime": self.total_time,
            "maxScore": self.max_score,
            "performanceDetail": self.performance_details,
            "pastScore": self.past_scores
        }


class SearchedRecords:
    pass
