import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchProducts = (category, search) => API.get(`/products?category=${category || ''}&search=${search || ''}`);
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const signIn = (formData) => API.post('/users/login', formData);
export const signUp = (formData) => API.post('/users/register', formData);
export const createOrder = (order) => API.post('/orders', order);
