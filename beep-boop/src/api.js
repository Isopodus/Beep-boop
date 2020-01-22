import axios from 'axios'
const domain = "http://localhost:8000"
const api = {
    sendAudio: (fileFormData) => {
        return axios.post(domain + "/recognize", fileFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
    },
    sendText: (text) => axios.post(domain + "/recognize", { text: text })
};

export default api;