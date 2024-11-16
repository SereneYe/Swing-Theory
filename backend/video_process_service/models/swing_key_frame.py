from datetime import datetime

class SwingKeyFrame:
    nose_0_x: float
    neck_1_x: float
    r_shoulder_2_x: float
    r_elbow_3_x: float
    r_wrist_4_x: float
    l_shoulder_5_x: float
    l_elbow_6_x: float
    l_wrist_7_x: float
    r_hip_8_x: float
    r_knee_9_x: float
    r_ankle_10_x: float
    l_hip_11_x: float
    l_knee_12_x: float
    l_ankle_13_x: float
    r_eye_14_x: float
    l_eye_15_x: float
    r_ear_16_x: float
    l_ear_17_x: float
    nose_0_y: float
    neck_1_y: float
    r_shoulder_2_y: float
    r_elbow_3_y: float
    r_wrist_4_y: float
    l_shoulder_5_y: float
    l_elbow_6_y: float
    l_wrist_7_y: float
    r_hip_8_y: float
    r_knee_9_y: float
    r_ankle_10_y: float
    l_hip_11_y: float
    l_knee_12_y: float
    l_ankle_13_y: float
    r_eye_14_y: float
    l_eye_15_y: float
    r_ear_16_y: float
    l_ear_17_y: float
    score: float
    comment: str
    stage: int
    frame: int
    url: str

    def __init__(self, data_dict, stage, frame, score, stroke_type, url=None, comment=None):
        self.stage = stage
        self.score = score
        self.frame = frame
        self.comment = comment
        self.stroke_type = stroke_type
        self.url = url
        self.nose_0_x = data_dict.get('nose_x', 0.0)
        self.neck_1_x = data_dict.get('neck_x', 0.0)
        self.r_shoulder_2_x = data_dict.get('r_shoulder_x', 0.0)
        self.r_elbow_3_x = data_dict.get('r_elbow_x', 0.0)
        self.r_wrist_4_x = data_dict.get('r_wrist_x', 0.0)
        self.l_shoulder_5_x = data_dict.get('l_shoulder_x', 0.0)
        self.l_elbow_6_x = data_dict.get('l_elbow_x', 0.0)
        self.l_wrist_7_x = data_dict.get('l_wrist_x', 0.0)
        self.r_hip_8_x = data_dict.get('r_hip_x', 0.0)
        self.r_knee_9_x = data_dict.get('r_knee_x', 0.0)
        self.r_ankle_10_x = data_dict.get('r_ankle_x', 0.0)
        self.l_hip_11_x = data_dict.get('l_hip_x', 0.0)
        self.l_knee_12_x = data_dict.get('l_knee_x', 0.0)
        self.l_ankle_13_x = data_dict.get('l_ankle_x', 0.0)
        self.r_eye_14_x = data_dict.get('r_eye_x', 0.0)
        self.l_eye_15_x = data_dict.get('l_eye_x', 0.0)
        self.r_ear_16_x = data_dict.get('r_ear_x', 0.0)
        self.l_ear_17_x = data_dict.get('l_ear_x', 0.0)
        self.nose_0_y = data_dict.get('nose_y', 0.0)
        self.neck_1_y = data_dict.get('neck_y', 0.0)
        self.r_shoulder_2_y = data_dict.get('r_shoulder_y', 0.0)
        self.r_elbow_3_y = data_dict.get('r_elbow_y', 0.0)
        self.r_wrist_4_y = data_dict.get('r_wrist_y', 0.0)
        self.l_shoulder_5_y = data_dict.get('l_shoulder_y', 0.0)
        self.l_elbow_6_y = data_dict.get('l_elbow_y', 0.0)
        self.l_wrist_7_y = data_dict.get('l_wrist_y', 0.0)
        self.r_hip_8_y = data_dict.get('r_hip_y', 0.0)
        self.r_knee_9_y = data_dict.get('r_knee_y', 0.0)
        self.r_ankle_10_y = data_dict.get('r_ankle_y', 0.0)
        self.l_hip_11_y = data_dict.get('l_hip_y', 0.0)
        self.l_knee_12_y = data_dict.get('l_knee_y', 0.0)
        self.l_ankle_13_y = data_dict.get('l_ankle_y', 0.0)
        self.r_eye_14_y = data_dict.get('r_eye_y', 0.0)
        self.l_eye_15_y = data_dict.get('l_eye_y', 0.0)
        self.r_ear_16_y = data_dict.get('r_ear_y', 0.0)
        self.l_ear_17_y = data_dict.get('l_ear_y', 0.0)

    def to_dict(self):
        return {
            'nose_0_x': float(self.nose_0_x),
            'neck_1_x': float(self.neck_1_x),
            'r_shoulder_2_x': float(self.r_shoulder_2_x),
            'r_elbow_3_x': float(self.r_elbow_3_x),
            'r_wrist_4_x': float(self.r_wrist_4_x),
            'l_shoulder_5_x': float(self.l_shoulder_5_x),
            'l_elbow_6_x': float(self.l_elbow_6_x),
            'l_wrist_7_x': float(self.l_wrist_7_x),
            'r_hip_8_x': float(self.r_hip_8_x),
            'r_knee_9_x': float(self.r_knee_9_x),
            'r_ankle_10_x': float(self.r_ankle_10_x),
            'l_hip_11_x': float(self.l_hip_11_x),
            'l_knee_12_x': float(self.l_knee_12_x),
            'l_ankle_13_x': float(self.l_ankle_13_x),
            'r_eye_14_x': float(self.r_eye_14_x),
            'l_eye_15_x': float(self.l_eye_15_x),
            'r_ear_16_x': float(self.r_ear_16_x),
            'l_ear_17_x': float(self.l_ear_17_x),
            'nose_0_y': float(self.nose_0_y),
            'neck_1_y': float(self.neck_1_y),
            'r_shoulder_2_y': float(self.r_shoulder_2_y),
            'r_elbow_3_y': float(self.r_elbow_3_y),
            'r_wrist_4_y': float(self.r_wrist_4_y),
            'l_shoulder_5_y': float(self.l_shoulder_5_y),
            'l_elbow_6_y': float(self.l_elbow_6_y),
            'l_wrist_7_y': float(self.l_wrist_7_y),
            'r_hip_8_y': float(self.r_hip_8_y),
            'r_knee_9_y': float(self.r_knee_9_y),
            'r_ankle_10_y': float(self.r_ankle_10_y),
            'l_hip_11_y': float(self.l_hip_11_y),
            'l_knee_12_y': float(self.l_knee_12_y),
            'l_ankle_13_y': float(self.l_ankle_13_y),
            'r_eye_14_y': float(self.r_eye_14_y),
            'l_eye_15_y': float(self.l_eye_15_y),
            'r_ear_16_y': float(self.r_ear_16_y),
            'l_ear_17_y': float(self.l_ear_17_y),
            'stage': self.stage,
            'frame': self.frame,
            'score': self.score,
            'url': self.url,
            'comment': self.comment,
            'stroke_type': self.stroke_type
        }