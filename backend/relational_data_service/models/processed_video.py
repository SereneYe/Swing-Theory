from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column

from db import db

class ProcessedVideo(db.Model):

    # Reflect the existing columns automatically
    processed_video_id = db.Column(db.Integer, primary_key=True)
    raw_video_id = db.Column(db.String(100))
    url = db.Column(db.Text)
    record_id = db.Column(db.String(100))
    created_date = db.Column(db.DateTime, default=func.now())
    created_by = db.Column(db.String(100), nullable=False, default='admin')
    updated_date = db.Column(db.DateTime, default=func.now())
    updated_by = db.Column(db.String(100), nullable=False, default='admin')
    is_deleted = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<video {self.processed_video_id, self.created_date}>'

    def to_dict(self):
        """Serialize the model instance to a dictionary."""
        return {
            'processed_video_id': self.processed_video_id,
            'raw_video_id': self.raw_video_id,
            'url': self.url,
            'record_id': self.record_id,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'created_by': self.created_by,
            'updated_date': self.updated_date.isoformat() if self.updated_date else None,
            'updated_by': self.updated_by,
            'is_deleted': self.is_deleted
        }