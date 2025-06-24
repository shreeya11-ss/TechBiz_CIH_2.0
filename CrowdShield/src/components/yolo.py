# yolo_detect_and_upload.py
import cv2
from ultralytics import YOLO
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# 1. Load YOLO model
model = YOLO("yolov8n.pt")  # or yolov5 if you prefer

# 2. Initialize Firebase
cred = credentials.Certificate("your-service-account-key.json")  # Download from Firebase Console
firebase_admin.initialize_app(cred)
db = firestore.client()

# 3. Run inference on video
def analyze_video(video_path, zone_id):
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    total_people = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % 10 == 0:  # Skip every 10th frame to be fast
            results = model(frame)
            people = 0
            for r in results:
                for cls in r.boxes.cls:
                    if int(cls) == 0:  # Class 0 = person
                        people += 1
            total_people += people
        frame_count += 1

    avg_people = total_people // max(1, frame_count // 10)

    # 4. Upload to Firestore
    data = {
        "zoneId": zone_id,
        "video": video_path,
        "crowd": avg_people,
        "timestamp": datetime.utcnow()
    }
    db.collection("zones").document(zone_id).set(data, merge=True)
    print(f"Uploaded zone data: {data}")

# Example usage
analyze_video("videos/video1.mp4", "zone1")
