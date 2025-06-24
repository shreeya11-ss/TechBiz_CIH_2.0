# 🛡️ Crowd Shield - Smart Crowd Monitoring System

**Crowd Shield** is a real-time crowd monitoring and alert system built for high-density areas like temples, public events, and religious gatherings. It helps identify and manage crowd surges, ensuring safety through proactive alerts and intuitive visualization.

---

## 📸 Project Overview

Crowd Shield uses computer vision to count people in a frame (via YOLO), maps zones using React Leaflet, and sends alerts to authorities when crowd thresholds are exceeded. It is specially designed for places where mobile usage is restricted and real-time monitoring is critical.

---

## 🚀 Features

- 🔍 **Real-time Crowd Counting** using YOLO object detection
- 🗺️ **Zone Mapping** with React Leaflet
- ⚠️ **Alert System** for crowd surges and threshold breaches
- 🔐 **Firebase Authentication** (Email/Password-based login)
- 🔔 **SMS/Email Alerts** using Twilio or Firebase
- 📊 **Heatmap Visualization** (optional future upgrade)

---

## 🛠️ Technologies Used

### Frontend:
- React.js
- Tailwind CSS
- React Leaflet
- Framer Motion (for animations)
- React Hot Toast (for alerts)

### Backend/Services:
- Firebase (Auth + Realtime DB or Firestore)
- YOLOv5 / YOLOv8 (run locally for crowd detection)
- Python (for object detection with pre-recorded video or future live camera integration)
- Twilio (for SMS alerts)

---

## 🗂️ Folder Structure (Basic)

CrowdShield/
│
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── utils/
│ ├── App.js
│ ├── firebaseConfig.js
│ ├── yolo_results/ (optional: for storing output frames)
│
├── yolo_script/ (Python YOLO detection script folder)
│ └── detect.py
│
├── .gitignore
├── package.json
├── README.md

yaml
Copy
Edit

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js + npm
- Python (with required YOLO dependencies)
- Firebase account
- Twilio account (for SMS)

### Frontend Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/CrowdShield.git
cd CrowdShield
Install dependencies

bash
Copy
Edit
npm install
Set up Firebase

Create a Firebase project

 Future Enhancements
Live CCTV feed integration

Admin panel for managing zones and thresholds

Crowd heatmaps

Integration with emergency services

Offline mobile alert system

Developer- Khushi Pandey
           shreeya sharma
          Ritu Singh
