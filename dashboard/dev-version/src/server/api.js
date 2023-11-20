import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "accept": 'application/json',
    },
});

export default api;