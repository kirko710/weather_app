from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('OPENWEATHER_API_KEY')
BASE_URL = 'https://api.openweathermap.org/data/2.5'

@app.route('/health')
def health():
    return jsonify({'status': 'ok', 'message': 'Server is running'})

@app.route('/api/weather')
def get_weather():
    city = request.args.get('city')

    if not city:
        return jsonify({'error': 'City is required'}), 400

    try:
        response = requests.get(
            f'{BASE_URL}/weather',
            params={
                'q': city,
                'appid': API_KEY,
                'units': 'metric',
                'lang': 'id'
            }
        )

        data = response.json()

        if response.status_code != 200:
            return jsonify({'error': data.get('message', 'City not found')}), 404

        weather = {
            'city': data['name'],
            'country': data['sys']['country'],
            'temperature': round(data['main']['temp']),
            'feels_like': round(data['main']['feels_like']),
            'humidity': data['main']['humidity'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'wind_speed': data['wind']['speed'],
            'min_temp': round(data['main']['temp_min']),
            'max_temp': round(data['main']['temp_max']),
        }

        return jsonify(weather)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
