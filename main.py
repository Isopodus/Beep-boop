from sanic import Sanic
from sanic.response import text, json

import requests
from tokenfile import token

app = Sanic()

"""
    Params:
        text - lyrics part, or song name to search for
        url - url to song record or humming
"""
@app.route('/recognize', methods=['GET'])
async def test(request):
    params = request.get_args()
    if 'text' in params:
        result = requests.post("https://api.audd.io/findLyrics/", data={
            'q': params['text'][0],
            'return': 'timecode,deezer,spotify',
            'api_token': token
        })
        return json(result.json())
    elif 'url' in params:
        result = requests.post("https://api.audd.io/", data={
            'url': params['url'][0],
            'return': 'timecode,deezer,spotify',
            'api_token': token
           })
        return json(result.json())
    else:
        return json({"error": "Unable to find url or text params"})

app.run(host='0.0.0.0', port=8000)
