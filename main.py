from sanic import Sanic
from sanic.response import text, json
from sanic_cors import CORS, cross_origin

import json as json_serializer
import requests
token = "659a449d700136368a532a200f069925"

app = Sanic()
CORS(app, automatic_options=True)


def generalize_response(response):
    if not 'error' in response:
        if isinstance(response['result'], list):
            result = []
            for obj in response['result']:
                if 'media' in obj:
                    media = json_serializer.loads(obj['media'])
                    media = [{
                        "provider": m['provider'],
                        "type": m['type'],
                        "url": m['url']
                    } for m in media]
                else:
                    media = [{
                        "provider": obj['media']['provider'],
                        "type": obj['media']['type'],
                        "url": obj['media']['url']
                    }]
                result.append({
                    "artist": obj['artist'],
                    "title": obj['title'],
                    "media": media
                })
        elif response['result']:
            result = [{
                "artist": response['result']['artist'] if 'artist' in response['result'] else None,
                "title": response['result']['title'],
                "media": json_serializer.loads(response['result']['media']) if 'media' in response['result'] else [{
                    "provider": "deezer",
                    "type": "audio",
                    "url": response['result']['deezer']['link'] if 'deezer' in response['result'] else None,
                }]
            }]
        else:
            return {
                "status": "success",
                "result": None
            }
    else:
        return {
            "status": "error",
            "error": response['error']
        }
    return {
        "status": response['status'],
        "result": result
    }


"""
    Params:
        text - lyrics part, or song name to search for
        file - song record or humming
"""
@app.route('/recognize', methods=['POST'])
async def recognize(request):
    record = request.files.get('record')
    if record:
        result = requests.post("https://api.audd.io/", data={
            'return': 'deezer',
            'api_token': token
        }, files={"file": record})
        return json(generalize_response(result.json()))
    elif 'text' in request.json:
        result = requests.post("https://api.audd.io/findLyrics/", data={
            'q': request.json['text'],
            'api_token': token
        })
        return json(generalize_response(result.json()))
    else:
        return json({"error": "Unable to find file or text params"})

app.run(host='0.0.0.0', port=8000)
