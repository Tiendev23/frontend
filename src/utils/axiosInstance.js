import axios from 'axios';

// Tạo một instance axios với base URL và cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',  // Đặt base URL cho API của bạn
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
    }
});

export default axiosInstance;
