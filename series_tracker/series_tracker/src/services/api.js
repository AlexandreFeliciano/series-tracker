import axios from "axios";

const api = axios.create({
    baseURL: "https://series-tracker-api.onrender.com/api"
});

export default api;