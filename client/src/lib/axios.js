import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://chatapp-backend-61nl.onrender.com/api",
    withCredentials: true,
})
