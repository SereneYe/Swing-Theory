from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column

from db import db
class SwingKeyFrame(db.Model):

    # Reflect the existing columns automatically
    swing_key_frame_id = db.Column(db.Integer, primary_key=True)
    processed_video_id = db.Column(db.Integer, nullable=False)
    nose_0_x = db.Column(db.Float, nullable=False)
    neck_1_x = db.Column(db.Float, nullable=False)
    r_shoulder_2_x = db.Column(db.Float, nullable=False)
    r_elbow_3_x = db.Column(db.Float, nullable=False)
    r_wrist_4_x = db.Column(db.Float, nullable=False)
    l_shoulder_5_x = db.Column(db.Float, nullable=False)
    l_elbow_6_x = db.Column(db.Float, nullable=False)
    l_wrist_7_x = db.Column(db.Float, nullable=False)
    r_hip_8_x = db.Column(db.Float, nullable=False)
    r_knee_9_x = db.Column(db.Float, nullable=False)
    r_ankle_10_x = db.Column(db.Float, nullable=False)
    l_hip_11_x = db.Column(db.Float, nullable=False)
    l_knee_12_x = db.Column(db.Float, nullable=False)
    l_ankle_13_x = db.Column(db.Float, nullable=False)
    r_eye_14_x = db.Column(db.Float, nullable=False)
    l_eye_15_x = db.Column(db.Float, nullable=False)
    r_ear_16_x = db.Column(db.Float, nullable=False)
    l_ear_17_x = db.Column(db.Float, nullable=False)
    nose_0_y = db.Column(db.Float, nullable=False)
    neck_1_y = db.Column(db.Float, nullable=False)
    r_shoulder_2_y = db.Column(db.Float, nullable=False)
    r_elbow_3_y = db.Column(db.Float, nullable=False)
    r_wrist_4_y = db.Column(db.Float, nullable=False)
    l_shoulder_5_y = db.Column(db.Float, nullable=False)
    l_elbow_6_y = db.Column(db.Float, nullable=False)
    l_wrist_7_y = db.Column(db.Float, nullable=False)
    r_hip_8_y = db.Column(db.Float, nullable=False)
    r_knee_9_y = db.Column(db.Float, nullable=False)
    r_ankle_10_y = db.Column(db.Float, nullable=False)
    l_hip_11_y = db.Column(db.Float, nullable=False)
    l_knee_12_y = db.Column(db.Float, nullable=False)
    l_ankle_13_y = db.Column(db.Float, nullable=False)
    r_eye_14_y = db.Column(db.Float, nullable=False)
    l_eye_15_y = db.Column(db.Float, nullable=False)
    r_ear_16_y = db.Column(db.Float, nullable=False)
    l_ear_17_y = db.Column(db.Float, nullable=False)
    score = db.Column(db.Integer)
    stage = db.Column(db.Integer)
    frame = db.Column(db.Integer)
    stroke_type = db.Column(db.String(10))
    comment = db.Column(db.String(250))
    url = db.Column(db.String(200))
    created_date = db.Column(db.DateTime, default=func.now())
    created_by = db.Column(db.String(100), nullable=False, default='admin')
    updated_date = db.Column(db.DateTime, default=func.now())
    updated_by = db.Column(db.String(100), nullable=False, default='admin')



    def __repr__(self):
        return f'<swing {self.swing_key_frame_id, self.created_date}>'

    def to_dict(self):
        return {
            'swing_key_frame_id': self.swing_key_frame_id,
            'processed_video_id': self.processed_video_id,
            'nose_0_x': self.nose_0_x,
            'neck_1_x': self.neck_1_x,
            'r_shoulder_2_x': self.r_shoulder_2_x,
            'r_elbow_3_x': self.r_elbow_3_x,
            'r_wrist_4_x': self.r_wrist_4_x,
            'l_shoulder_5_x': self.l_shoulder_5_x,
            'l_elbow_6_x': self.l_elbow_6_x,
            'l_wrist_7_x': self.l_wrist_7_x,
            'r_hip_8_x': self.r_hip_8_x,
            'r_knee_9_x': self.r_knee_9_x,
            'r_ankle_10_x': self.r_ankle_10_x,
            'l_hip_11_x': self.l_hip_11_x,
            'l_knee_12_x': self.l_knee_12_x,
            'l_ankle_13_x': self.l_ankle_13_x,
            'r_eye_14_x': self.r_eye_14_x,
            'l_eye_15_x': self.l_eye_15_x,
            'r_ear_16_x': self.r_ear_16_x,
            'l_ear_17_x': self.l_ear_17_x,
            'nose_0_y': self.nose_0_y,
            'neck_1_y': self.neck_1_y,
            'r_shoulder_2_y': self.r_shoulder_2_y,
            'r_elbow_3_y': self.r_elbow_3_y,
            'r_wrist_4_y': self.r_wrist_4_y,
            'l_shoulder_5_y': self.l_shoulder_5_y,
            'l_elbow_6_y': self.l_elbow_6_y,
            'l_wrist_7_y': self.l_wrist_7_y,
            'r_hip_8_y': self.r_hip_8_y,
            'r_knee_9_y': self.r_knee_9_y,
            'r_ankle_10_y': self.r_ankle_10_y,
            'l_hip_11_y': self.l_hip_11_y,
            'l_knee_12_y': self.l_knee_12_y,
            'l_ankle_13_y': self.l_ankle_13_y,
            'r_eye_14_y': self.r_eye_14_y,
            'l_eye_15_y': self.l_eye_15_y,
            'r_ear_16_y': self.r_ear_16_y,
            'l_ear_17_y': self.l_ear_17_y,
            'stage': self.stage,
            'score': self.score,
            'frame': self.frame,
            'stroke_type': self.stroke_type,
            'url': self.url,
            'created_date': self.created_date.isoformat() if self.created_date else None,
            'created_by': self.created_by,
            'updated_date': self.updated_date.isoformat() if self.updated_date else None,
            'updated_by': self.updated_by
        }