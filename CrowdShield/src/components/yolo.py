import cv2
import os
from ultralytics import YOLO
import firebase_admin
from firebase_admin import credentials, db
import datetime

# ✅ Load YOLOv8 model
print("Current Working Directory:", os.getcwd())
model = YOLO("yolov8n.pt")

# ✅ Load video
video_path = r"D:\B-TECH-CSE\HACKATHONS\Central India Hackathon 2.0\TechBiz_CIH_2.0\CrowdShield\public\video3.mp4"
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("❌ Error: Could not open video.")
    exit()

frame_count = 0
total_people = 0

while True:
    ret, frame = cap.read()
    if not ret:
        print("⚠️ End of video or failed to read frame.")
        break

    frame_count += 1
    frame_resized = cv2.resize(frame, (640, 640))

    results = model(frame_resized)
    boxes = results[0].boxes
    people = [b for b in boxes if int(b.cls[0]) == 0 and b.conf[0] > 0.3]
    people_count = len(people)
    total_people += people_count

    print(f"Frame {frame_count}: {people_count} people detected")

    for box in people:
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        cv2.rectangle(frame_resized, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame_resized, "Person", (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    cv2.imshow("YOLOv8 People Detection", frame_resized)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# ✅ Final count print
print(f"Total people counted (not unique): {total_people}")

# 🔥 ✅ Uploading to Firebase

# Path to your Firebase service account key JSON
cred_path = r"crowd.json"

# Firebase Realtime Database URL
db_url = "https://crowdshield-4c06b-default-rtdb.firebaseio.com/"

# Initialize Firebase only once
if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        'databaseURL': db_url
    })

# Prepare data
zone_data = {
    "zone": "Connaught Place",
    "crowd_count": total_people,
    "threshold": 120,
    "timestamp": datetime.datetime.now().isoformat()
}

# Upload data
ref = db.reference('/zones/zone1')
ref.set(zone_data)

print("✅ Uploaded to Firebase:", zone_data)
