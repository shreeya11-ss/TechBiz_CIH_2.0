from ultralytics import YOLO
import cv2
import sys
import json

video_path = sys.argv[1]
model = YOLO("yolov8n.pt")

cap = cv2.VideoCapture(public/video3.mp4)
total_count = 0
frames = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    results = model(frame)
    people = sum(1 for obj in results[0].boxes.cls if int(obj) == 0)
    total_count += people
    frames += 1

cap.release()
avg_count = total_count // frames
print(json.dumps({"crowd": avg_count}))
