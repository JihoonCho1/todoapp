import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and not have retired
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            const res = await axios.post("/api/auth/refresh-token", 
                {}, { withCredentials: true}
            );

            const newAccessToken = res.data.accessToken;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return api(originalRequest);
        }
        return Promise.reject(error);
    }
)

export default api;