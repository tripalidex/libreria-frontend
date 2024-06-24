import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

const axiosPrivateInstance = axios.create({
    baseURL: BASE_URL,
});

export { axiosInstance, axiosPrivateInstance };