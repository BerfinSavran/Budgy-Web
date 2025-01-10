import axios from "axios";

// Axios varsayılan yapılandırması
const axiosInstance = axios.create({
    baseURL: "https://localhost:7091", // Backend API base URL
    timeout: 10000, // İsteğin zaman aşımı süresi (opsiyonel)
});

// İstek interceptor'u ekleme
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Yanıt interceptor'u ekleme (opsiyonel)
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Yetkilendirme hatası (opsiyonel logout veya yönlendirme)
        console.error("Unauthorized! Redirecting to login...");
        // localStorage.clear(); // Kullanıcı oturumunu temizle
        // window.location.href = "/login"; // Giriş sayfasına yönlendirme
    }
    return Promise.reject(error);
});

export default axiosInstance;
