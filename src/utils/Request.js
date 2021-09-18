import axios from 'axios'
import { getToken, getProUrl } from '@/utils/Cookies.js'
// import Vue from 'vue'
const request = axios.create({
    baseURL: process.env.VUE_APP_REQUEST_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Access-Control-Allow-Origin': 'http://online.xyzg.top',
    },
})

const err = (error) => {
    if (error.response) {
        // if (error.response.status === 403) {
        // //   Notify({ type: 'danger', message: data.message||data.msg });
        // }
        // if (error.response.status === 401) {
        //     // Notify({ type: 'danger', message: '你没有权限。' });
        //     Vue.prototype.router.push('/token_error');
        // }
        if (error.response.status !== 200) {
            // Notify({ type: 'danger', message: '你没有权限。' });
            // Vue.prototype.router.push('/token_error');
        }
    }
    return Promise.reject(error);
}

request.interceptors.request.use(config => {
        config.baseURL = getProUrl();
        config.headers.Authorization = getToken();
        return config;
    }, err => {
        console.log(err);
    }
);

request.interceptors.response.use((response) => {
    if (response.status !== 200) {
        return Promise.reject('error');
    }
    return response;
}, err);

export default request
