import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Loading State dengan SweetAlert2
    Swal.fire({
      title: 'Menghubungkan...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // 2. Simulasi Logika Login (Nanti diganti Axios)
    setTimeout(() => {
      // Kita anggap login sukses jika password diisi minimal 6 karakter
      if (formData.password.length >= 6) {
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Selamat datang kembali di Portal SPMB!',
          confirmButtonColor: '#2563eb',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // PINDAH KE DASHBOARD SISWA
          navigate('/siswa/dashboard');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: 'Email atau password salah. Silakan coba lagi.',
          confirmButtonColor: '#ef4444'
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Masuk Portal SPMB
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Belum punya akun?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
            Daftar di sini
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
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
                  placeholder="Masukkan email terdaftar"
                  value={formData.email} onChange={handleChange}
                />
              </div>
            </div>

            {/* INPUT PASSWORD */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FaLock />
                </div>
                <input
                  type="password" name="password" required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-200 rounded-xl py-3 border transition-all"
                  placeholder="Masukkan password"
                  value={formData.password} onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-95 shadow-blue-200"
              >
                <FaSignInAlt /> Masuk Ke Portal
              </button>
            </div>

            <div className="text-center">
              <Link to="/alur" className="text-xs text-slate-400 hover:text-blue-600 transition-colors">
                Lupa password atau kendala teknis? Hubungi Panitia
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}