import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

// Attach the JWT to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Expired or invalid token: clear the session and send the user back to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthCall = error.config?.url?.startsWith("/users/");
        if (error.response?.status === 401 && !isAuthCall) {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
