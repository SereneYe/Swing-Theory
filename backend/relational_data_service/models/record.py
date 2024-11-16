from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column

from db import db

class Record(db.Model):
    # Reflect the existing columns automatically
    record_id = db.Column(db.String(100), primary_key=True)
    user_id = db.Column(db.String(100))
    stroke_numbers = db.Column(db.Integer)
    stroke_type = db.Column(db.String(10))
    created_date = db.Column(db.DateTime, default=func.now())
    created_by = db.Column(db.String(100), nullable=False, default='admin')
    updated_date = db.Column(db.DateTime, default=func.now())
    updated_by = db.Column(db.String(100), nullable=False, default='admin')
    is_deleted = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<record {self.record_id, self.created_date, self.user_id}>'

    def to_dict(self):
        """Serialize the model instance to a dictionary."""
        return {
            'user_id': self.user_id,
            'record_id': self.record_id,
            'stroke_numbers': self.stroke_numbers,
            'stroke_type': self.stroke_type,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'created_by': self.created_by,
            'updated_date': self.updated_date.isoformat() if self.updated_date else None,
            'updated_by': self.updated_by,
            'is_deleted': self.is_deleted
        }

