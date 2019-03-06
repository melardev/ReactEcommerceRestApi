import axios from "axios";
import {UsersService} from "../../local/UsersService";


let cachedUser = {};
UsersService.subscribe((user) => {
    cachedUser = user;
});

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    responseType: 'json',
    responseEncoding: 'utf8'
});

axiosInstance.interceptors.request.use((config) => {
    if (cachedUser.token)
        config.headers.authorization = "Bearer " + cachedUser.token;
    return config;
}, function (error) {
    return Promise.reject(error);
});

function get(url) {
    return axiosInstance.get(url)
}

function post(url, data) {
    return axiosInstance.post(url, data);
}


function fetchPage(url, pagination = {page: 1, page_size: 5}) {
    return get(`${url}?page=${pagination.page || 1}&page_size=${pagination.page_size || 5}`)
}

function put() {

}

function destroy(url) {

}

export const AxiosService = {
    axiosInstance,
    get,
    post,
    put,
    destroy,
    fetchPage
};
