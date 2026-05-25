import axios from 'axios';

// 1. Mengambil URL Backend (Ngrok) dari file .env
// Pastikan di file .env kamu sudah menulis: VITE_API_URL=https://link-ngrok-arif.ngrok-free.app/api
const API_URL = import.meta.env.VITE_API_URL;

// 2. Membuat "Jembatan" Axios dengan konfigurasi dasar
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // KODE SAKTI: Wajib ada agar Axios tidak diblokir oleh halaman peringatan dari Ngrok
    'ngrok-skip-browser-warning': 'true',
  },
});

// 3. Request Interceptor (Satpam Pintu Keluar)
// Fungsi ini otomatis mengecek: "Apakah siswa sudah login?"
// Jika sudah, dia akan menyelipkan Token JWT dari localStorage ke dalam tas (headers) sebelum data dikirim ke Arif.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Pasang token di header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Jika ada error sebelum terkirim, tolak request-nya
    return Promise.reject(error);
  }
);

export default api;