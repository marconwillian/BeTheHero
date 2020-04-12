import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3333-e95da63d-a0c3-434f-ab4c-a3dc23eea029.ws-us02.gitpod.io/'
});

export default api;