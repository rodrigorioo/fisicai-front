import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

axiosInstance.interceptors.request.use( (config) => {
    const token = localStorage.getItem("user") ?? null;

    if (token) {
        config.headers["x-access-token"] = token;
    }

    return config;
});

export default {
    install (Vue) {
        Object.defineProperty(Vue.prototype, '$axios', { value: axiosInstance });
    }
}
