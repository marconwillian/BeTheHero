import axios from 'axios';

const api = axios.create({
    baseURL: 'https://server.bethehero.marconwillian.dev/'
});

export default api;