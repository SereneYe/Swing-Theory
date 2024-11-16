from datetime import datetime

class ProcessedVideo:
    raw_video_id: int
    url: str


    def __init__(self, raw_video_id,url=None):
        self.raw_video_id = raw_video_id
        self.url = url



    def to_dict(self):
        return {
            'raw_video_id': self.raw_video_id,
            'url': self.url
        }