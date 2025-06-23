from flask import Flask, request, jsonify
import subprocess
import json
import os

app = Flask(__name__)

@app.route("/count", methods=["POST"])
def count_people():
    data = request.json
    video_path = data.get("videoPath")

    if not video_path or not os.path.exists(video_path):
        return jsonify({"error": "Invalid or missing video path"}), 400

    result = subprocess.run(
        ["python", "crowd_counter.py", video_path],
        capture_output=True, text=True
    )

    try:
        count = json.loads(result.stdout)
        return jsonify(count)
    except:
        return jsonify({"error": "Failed to count crowd"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
