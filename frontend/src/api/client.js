import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor to extract API error messages
client.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = 'An unexpected error occurred';
        if (error.response?.data?.detail) {
            // FastAPI usually sends errors in { detail: "" } or an array of validation errors
            if (Array.isArray(error.response.data.detail)) {
                message = error.response.data.detail.map(e => e.msg).join(', ');
            } else {
                message = error.response.data.detail;
            }
        } else if (error.message) {
            message = error.message;
        }
        return Promise.reject(new Error(message));
    }
);

export default client;
