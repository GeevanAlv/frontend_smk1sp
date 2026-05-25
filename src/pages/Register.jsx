import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import api from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  
  // 1. Disesuaikan dengan Payload JSON dari Arif (name, email, password)
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Validasi Password Client-Side
    if (formData.password.length < 6) {
      return Swal.fire({
        icon: 'warning',
        title: 'Password Terlalu Pendek',
        text: 'Minimal gunakan 6 karakter demi keamanan akun Anda.',
        confirmButtonColor: '#f59e0b'
      });
    }

    Swal.fire({
      title: 'Menyimpan Data...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      // 3. Menembak API Backend Arif
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // 4. Jika berhasil masuk ke MySQL
      Swal.fire({
        icon: 'success',
        title: 'Akun SPMB Berhasil Dibuat!',
        text: 'Silakan masuk menggunakan Email dan Password Anda.',
        confirmButtonColor: '#2563eb',
      }).then(() => {
        navigate('/login'); // Pindah ke halaman login
      });

    } catch (error) {
      // 5. Menangkap pesan error dari NestJS (misal: Email sudah digunakan)
      const pesanError = error.response?.data?.message || 'Terjadi kesalahan pada server. Coba lagi nanti.';
      
      Swal.fire({
        icon: 'error',
        title: 'Pendaftaran Gagal',
        text: typeof pesanError === 'object' ? pesanError[0] : pesanError,
        confirmButtonColor: '#ef4444'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Buat Akun SPMB
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Atau{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
            sudah punya akun? Masuk di sini
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* INPUT NAMA (Perhatikan name="name" sesuai permintaan backend) */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FaUser />
                </div>
                <input
                  type="text" name="name" required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-200 rounded-xl py-3 border transition-all"
                  placeholder="Sesuai Ijazah / KK"
                  value={formData.name} onChange={handleChange}
                />
              </div>
            </div>

            {/* INPUT EMAIL */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Alamat Email</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email" name="email" required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-200 rounded-xl py-3 border transition-all"
                  placeholder="email@contoh.com"
                  value={formData.email} onChange={handleChange}
                />
              </div>
            </div>

            {/* INPUT PASSWORD */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password Akun</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FaLock />
                </div>
                <input
                  type="password" name="password" required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-200 rounded-xl py-3 border transition-all"
                  placeholder="Minimal 6 karakter"
                  value={formData.password} onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95 shadow-blue-200"
              >
                Daftar Akun Sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}