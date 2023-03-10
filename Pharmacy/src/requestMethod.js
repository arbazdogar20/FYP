import axios from 'axios';

const BASE_URL = "http://localhost:5000/api"

export const Pic  = "http://localhost:5000/images/"

export const publicRequest = axios.create({
    baseURL: BASE_URL
});