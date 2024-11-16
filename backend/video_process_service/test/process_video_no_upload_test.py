import unittest
from services import video_process_service

class MyTestCase(unittest.TestCase):
    def test_process_and_no_upload(self):
        video_process_service.process_video_with_yolo("9", "Backhand")
        # self.assertEqual(True, False)  # add assertion here


if __name__ == '__main__':
    unittest.main()
