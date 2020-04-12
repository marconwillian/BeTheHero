import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3333-f55a70ad-61ef-4ffd-b728-4404464581a9.ws-us02.gitpod.io/'
});

export default api;