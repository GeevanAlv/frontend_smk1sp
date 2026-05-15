import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaPrint, FaClock, FaExclamationTriangle, FaCheckCircle, FaSignOutAlt, FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function DashboardSiswa() {
  const navigate = useNavigate();

  // DUMMY DATA: Nanti ini diambil dari API Backend berdasarkan sesi login user
  const dataSiswa = {
    nama: "Budi Santoso",
    statusBerkas: "revisi", // Pilihan: "pending", "terverifikasi", "revisi"
    pesanPanitia: "Scan Kartu Keluarga (KK) buram, tolong upload ulang yang lebih jelas.",
    statusDiterima: null // Pilihan: null (belum pengumuman), true (Diterima), false (Ditolak)
  };

  // Fungsi Logout dengan Konfirmasi
  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar dari Portal?',
      text: "Anda harus login kembali untuk mengakses data pendaftaran.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus token jika nanti sudah pakai backend: localStorage.removeItem('token');
        navigate('/login');
      }
    });
  };

  // Fungsi untuk merender UI status box berdasarkan kondisi statusBerkas
  const renderStatusBox = () => {
    switch (dataSiswa.statusBerkas) {
      case 'terverifikasi':
        return (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm shadow-green-100">
            <FaCheckCircle className="text-green-600 text-4xl shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-black text-green-900 mb-1 tracking-tight">Berkas Terverifikasi</h3>
              <p className="text-green-700 text-sm leading-relaxed font-medium">Pendaftaran Anda telah divalidasi oleh panitia. Silakan tunggu waktu pengumuman hasil seleksi sesuai jadwal.</p>
            </div>
          </div>
        );
      case 'revisi':
        return (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm shadow-red-100">
            <FaExclamationTriangle className="text-red-600 text-4xl shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-black text-red-900 mb-1 tracking-tight">Pendaftaran Butuh Revisi!</h3>
              <p className="text-red-700 text-sm mb-4 leading-relaxed font-medium italic">"{dataSiswa.pesanPanitia}"</p>
              <Link 
                to="/siswa/daftar" 
                className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-all shadow-md shadow-red-200 active:scale-95"
              >
                <FaEdit /> Perbaiki Data Sekarang
              </Link>
            </div>
          </div>
        );
      default: // 'pending'
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm shadow-amber-100">
            <FaClock className="text-amber-600 text-4xl shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-black text-amber-900 mb-1 tracking-tight">Menunggu Verifikasi</h3>
              <p className="text-amber-700 text-sm leading-relaxed font-medium">Data Anda sedang dalam antrean pengecekan oleh panitia SPMB. Mohon cek halaman ini secara berkala dalam 1x24 jam.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Dashboard */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase mb-2">Portal Calon Siswa SPMB</h2>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Halo, {dataSiswa.nama}!</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 font-bold transition-all px-4 py-2 hover:bg-red-50 rounded-xl"
          >
            <FaSignOutAlt /> Keluar Sistem
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Konten - Status */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <FaInfoCircle className="text-blue-600" /> Status Pendaftaran
              </h3>
              {renderStatusBox()}
            </div>

            {/* Menu Aksi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link 
                to="/siswa/daftar" 
                className="bg-white border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all rounded-3xl p-8 flex flex-col gap-5 group relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <FaEdit />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg tracking-tight">Formulir Biodata</h4>
                  <p className="text-sm text-slate-500 font-medium">Lengkapi & unggah berkas pendaftaran</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FaEdit size={80} />
                </div>
              </Link>
              
              <Link 
                to="/siswa/pengumuman" 
                className="bg-white border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all rounded-3xl p-8 flex flex-col gap-5 group relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <FaPrint />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg tracking-tight">Hasil Pengumuman</h4>
                  <p className="text-sm text-slate-500 font-medium">Cek kelulusan & cetak kartu ujian</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FaPrint size={80} />
                </div>
              </Link>
            </div>
          </div>

          {/* Sidebar - Informasi Singkat */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-black text-xl mb-6 border-b border-slate-700 pb-4">Bantuan Teknis</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">
                  Jika terdapat kendala saat mengunggah berkas atau lupa kata sandi, silakan hubungi operator kami:
                </p>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">WhatsApp Panitia</p>
                    <p className="text-lg font-bold">0815-4117-9123</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Email Resmi</p>
                    <p className="text-sm font-bold">smknsatusp@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <FaInfoCircle size={200} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}