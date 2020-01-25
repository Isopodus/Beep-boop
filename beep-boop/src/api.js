import axios from 'axios'
const token = "659a449d700136368a532a200f069925"
const api = {
    sendAudio: (fileFormData) => {
        return axios.post("https://api.audd.io/", {
            ...fileFormData,
            api_token: token
        }, {
            headers: {
            }
        })
    },
    sendText: (text) => {
        return axios.get("https://api.audd.io/findLyrics/", {
            params: {
                q: text,
                api_token: token
            }
        })
    },
    generalizeResponse: (response) => {
        let result = []
        let media = []
        if (!('error' in response)) {
            if (response.result instanceof Array) {
                response.result.forEach(obj => {
                    if ('media' in obj) {
                        media = JSON.parse(obj.media)
                        media = media.map(m => {
                            return {
                                "provider": m.provider,
                                "type": m.type,
                                "url": m.url
                            }
                        })
                    }
                    else {
                        let media = [{
                            "provider": obj.media.provider,
                            "type": obj.media.type,
                            "url": obj.media.url
                        }]
                        result.append({
                            "artist": obj.artist,
                            "title": obj.title,
                            "media": media
                        })
                    }
                });
            }
            else if (response.result) {
                result = [{
                    "artist": ('artist' in response.result) ? response.result.artist : null,
                    "title": response.result.title,
                    "media": ('media' in response.result) ? JSON.parse(response.result.media) : [{
                        "provider": "youtube",
                        "type": "audio",
                        "url": ('youtube' in response.result) ? response.result.youtube.link : null,
                    }]
                }]
            }
            else {
                return {
                    "status": "success",
                    "result": null
                }
            }
        }
        else {
            return {
                "status": "error",
                "error": response.error
            }
        }
        return {
            "status": response.status,
            "result": result
        }
    }
}

export default api;