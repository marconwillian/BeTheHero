import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bethehero-server.herokuapp.com/'
});

export default api;