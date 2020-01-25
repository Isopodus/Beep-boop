import axios from 'axios'
const token = "c6d71199deb371d07642eb567d17227f"
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
                    if ('media' in obj && obj.media !== "") {
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
                        media = [{
                            "provider": obj.media.provider,
                            "type": obj.media.type,
                            "url": obj.media.url
                        }]
                    }
                    result.push({
                        "artist": obj.artist,
                        "title": obj.title,
                        "media": media
                    })
                });
            }
            else if (response.result) {
                result = [{
                    "artist": ('artist' in response.result) ? response.result.artist : null,
                    "title": response.result.title,
                    "media": ('media' in response.result && response.result.media !== "") ? JSON.parse(response.result.media) : [{
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