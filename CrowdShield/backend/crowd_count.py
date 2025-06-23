from ultralytics import YOLO
import cv2
import sys
import json

video_path = sys.argv[1]
model = YOLO("yolov8n.pt")  # You can change this to 'yolov8m.pt' etc.

cap = cv2.VideoCapture(CrowdShield/public/video3.mp4)
total_people = 0
frame_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)
    people = sum(1 for c in results[0].boxes.cls if int(c) == 0)
    total_people += people
    frame_count += 1

cap.release()
avg_people = total_people // max(1, frame_count)
print(json.dumps({"crowd": avg_people}))
