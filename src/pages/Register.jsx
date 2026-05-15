import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    nama: '', 
    email: '', 
    nisn: '', // Tambahan NISN
    password: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- VALIDASI CLIENT-SIDE ---
    
    // 1. Validasi NISN (Harus angka dan 10 digit)
    if (formData.nisn.length !== 10) {
      return Swal.fire({
        icon: 'error',
        title: 'NISN Tidak Valid',
        text: 'NISN harus berjumlah tepat 10 digit angka.',
        confirmButtonColor: '#ef4444'
      });
    }

    // 2. Validasi Password
    if (formData.password.length < 6) {
      return Swal.fire({
        icon: 'warning',
        title: 'Password Terlalu Pendek',
        text: 'Minimal gunakan 6 karakter demi keamanan akun Anda.',
        confirmButtonColor: '#f59e0b'
      });
    }

    // --- PROSES SIMULASI API ---
    
    Swal.fire({
      title: 'Memproses Pendaftaran...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Simulasi delay pengiriman data ke Backend (Axios nanti di sini)
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Akun SPMB Berhasil Dibuat!',
        text: 'Silakan masuk menggunakan Email dan Password Anda.',
        confirmButtonColor: '#2563eb',
        timer: 3000,
        timerProgressBar: true
      }).then(() => {
        // Redirect ke halaman login setelah sukses
        navigate('/login');
      });
    }, 2000);
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
            
            {/* INPUT NAMA */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FaUser />
                </div>
                <input
                  type="text" name="nama" required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-200 rounded-xl py-3 border transition-all"
                  placeholder="Sesuai Ijazah / KK"
                  value={formData.nama} onChange={handleChange}
                />
              </div>
            </div>

            {/* INPUT NISN */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">NISN</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <FaIdCard />
                </div>
                <input
                  type="number" name="nisn" required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-200 rounded-xl py-3 border transition-all"
                  placeholder="10 Digit Nomor Induk Siswa Nasional"
                  value={formData.nisn} onChange={handleChange}
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