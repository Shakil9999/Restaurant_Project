import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


// https://restaurant-project-server-tau.vercel.app/
const axiosSecure = axios.create({
    baseURL: 'https://restaurant-project-server-tau.vercel.app'
    
});

let isLoggingOut = false; // ✅ Prevent multiple logout calls

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // ✅ Request interceptor: Add Bearer token
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // ✅ Response interceptor: Handle 401/403 only once
    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
            const status = error?.response?.status;

            console.log('status error in the interceptor', status);

            if ((status === 401 || status === 403) && !isLoggingOut) {
                isLoggingOut = true;
                try {
                    await logOut();
                } catch (logoutErr) {
                    console.error("Logout failed:", logoutErr);
                } finally {
                    navigate("/login");
                    isLoggingOut = false; // Reset flag after redirect
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
