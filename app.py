from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')

    # Gửi yêu cầu tới API GPT-Neo
    url = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M"
    headers = {
        "Authorization": "Bearer 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",  # Nếu cần khóa API
        "Content-Type": "application/json"
    }
    payload = {
        "inputs": prompt,
        "options": {"use_cache": False}
    }
    response = requests.post(url, headers=headers, json=payload)
    output = response.json()

    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)
