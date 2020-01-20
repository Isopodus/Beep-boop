from sanic import Sanic
from sanic.response import text, json

import json as json_serializer
import requests
token = "659a449d700136368a532a200f069925"

app = Sanic()

def generalize_response(response):
    if isinstance(response['result'], list):
        result = []
        for obj in response['result']:
            if 'media' in obj:
                media = json_serializer.loads(obj['media'])
                media = [{
                    "provider": media['provider'],
                    "type": media['type'],
                    "url": media['url']
                } for media in media]
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
    else:
        result = [{
            "artist": response['result']['artist'],
            "title": response['result']['title'],
            "media": json_serializer.loads(response['result']['media']) if 'media' in response['result'] else [{
                "provider": "deezer",
                "type": "audio",
                "url": response['result']['deezer']['link']
            }]
        }]
    return {
        "status": response['status'],
        "result": result
    }

"""
    Params:
        text - lyrics part, or song name to search for
        url - url to song record or humming
"""
@app.route('/recognize', methods=['GET'])
async def recognize(request):
    params = request.get_args()
    if 'text' in params:
        result = requests.post("https://api.audd.io/findLyrics/", data={
            'q': params['text'][0],
            'return': 'timecode,deezer,spotify',
            'api_token': token
        })
        return json(generalize_response(result.json()))
    elif 'url' in params:
        result = requests.post("https://api.audd.io/", data={
            'url': params['url'][0],
            'return': 'timecode,deezer,spotify',
            'api_token': token
           })
        return json(generalize_response(result.json()))
    else:
        return json({"error": "Unable to find url or text params"})

app.run(host='0.0.0.0', port=8000)
