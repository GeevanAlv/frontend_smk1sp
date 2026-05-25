import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaEdit, FaPrint, FaClock, FaExclamationTriangle, 
  FaCheckCircle, FaSignOutAlt, FaInfoCircle, 
  FaTimesCircle, FaFileSignature, FaArrowRight,
  FaBullhorn
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function DashboardSiswa() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user')) || { name: 'Siswa' };

  const [statusData, setStatusData] = useState({
    status: 'LOADING',
    notes: []
  });

  // =========================================================================
  // 🛡️ EFFECT DIPERBARUI: DILENGKAPI "SATPAM" PENJAGA TOKEN
  // =========================================================================
  useEffect(() => {
    let isMounted = true;

    // SATPAM 1: Cek apakah token masih ada di Local Storage saat halaman dibuka?
    const token = localStorage.getItem('token');
    if (!token) {
      // Jika token tidak ada (sudah dihapus), langsung usir ke halaman login!
      navigate('/login', { replace: true });
      return; 
    }

    const fetchStatus = async () => {
      try {
        const response = await api.get('/users/registration-status');
        
        if (isMounted) {
          const currentStatus = response.data?.data?.verification_status?.toUpperCase();
          setStatusData({
            status: currentStatus ? currentStatus : 'BELUM_DAFTAR',
            notes: response.data?.data?.documents_need_revision || []
          });
        }
      } catch (error) {
        if (isMounted) {
          // SATPAM 2: Deteksi jika API Arief menolak karena token kadaluarsa/salah (Error 401)
          if (error.response && error.response.status === 401) {
            console.log("Sesi tidak valid! Mengeluarkan paksa...");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login', { replace: true });
          } else {
            // Jika error lain (misal server down), set ke belum daftar
            setStatusData({ status: 'BELUM_DAFTAR', notes: [] });
          }
        }
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, [navigate]); // Pastikan navigate masuk di sini

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar dari Portal?',
      text: 'Sesi Anda akan diakhiri.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    });
  };

  const renderStatusAndMenu = () => {
    if (statusData.status === 'LOADING') {
      return (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-xl shadow-slate-200/50">
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">Memuat sinkronisasi data...</p>
        </div>
      );
    }

    switch (statusData.status) {
      
      case 'BELUM_DAFTAR':
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
              <div className="w-20 h-20 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-4xl shrink-0">
                <FaFileSignature />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Status: Segera Upload Berkas</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Data Anda belum masuk ke sistem kami. Anda harus mengisi formulir biodata dan mengunggah dokumen persyaratan untuk melanjutkan proses seleksi.
                </p>
              </div>
            </div>

            {/* SINYAL PENDAFTARAN BARU */}
            <Link to="/siswa/daftar" className="group bg-white hover:bg-blue-600 border border-slate-200 hover:border-transparent transition-all duration-300 rounded-3xl p-8 flex items-center justify-between shadow-xl shadow-slate-200/50 cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl group-hover:bg-white transition-colors">
                  <FaEdit />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 group-hover:text-white text-xl tracking-tight transition-colors">Formulir Biodata Pendaftaran</h4>
                  <p className="text-slate-500 group-hover:text-blue-100 font-medium mt-1 transition-colors">Isi data diri & unggah berkas pendaftaran asli.</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-300 group-hover:text-white text-2xl transition-colors" />
            </Link>
          </div>
        );

      case 'REVISI':
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-20 h-20 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center text-4xl shrink-0">
                  <FaExclamationTriangle />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-amber-900 mb-2 tracking-tight">Status: Revisi Berkas Dibutuhkan!</h3>
                  <p className="text-amber-800 font-medium mb-4">Panitia menemukan ketidaksesuaian pada dokumen yang Anda unggah. Perbaiki segera berdasarkan catatan berikut:</p>
                  
                  <div className="bg-white/60 p-5 rounded-2xl border border-amber-200/50">
                    <ul className="list-disc pl-5 text-amber-900 font-bold space-y-2">
                      {statusData.notes.map((note, idx) => (
                        <li key={idx}><span className="uppercase text-amber-700">{note.type.replace(/_/g, ' ')}</span>: {note.keterangan}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              to="/siswa/daftar" 
              state={{ isRevisi: true, notes: statusData.notes }} 
              className="group bg-white hover:bg-amber-600 border border-slate-200 hover:border-transparent transition-all duration-300 rounded-3xl p-8 flex items-center justify-between shadow-xl shadow-slate-200/50 cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl group-hover:bg-white transition-colors">
                  <FaEdit />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 group-hover:text-white text-xl tracking-tight transition-colors">Perbaiki & Upload Ulang Berkas</h4>
                  <p className="text-slate-500 group-hover:text-amber-100 font-medium mt-1 transition-colors">Ganti berkas yang ditandai salah dengan file baru.</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-300 group-hover:text-white text-2xl transition-colors" />
            </Link>
          </div>
        );

      case 'TERVERIFIKASI':
      case 'VERIFIED':
      case 'APPROVED':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
               <div className="w-20 h-20 bg-green-200 text-green-700 rounded-full flex items-center justify-center text-4xl shrink-0">
                  <FaCheckCircle />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-black text-green-900 mb-2 tracking-tight">Status: Berkas Terverifikasi!</h3>
                  <p className="text-green-800 leading-relaxed font-medium">
                    Selamat! Data dan dokumen pendaftaran Anda telah disetujui. Langkah Anda selanjutnya adalah mencetak Kartu Peserta Ujian.
                  </p>
                </div>
            </div>

            <Link to="/siswa/pengumuman" className="group bg-white hover:bg-green-600 border border-slate-200 hover:border-transparent transition-all duration-300 rounded-3xl p-8 flex items-center justify-between shadow-xl shadow-slate-200/50 cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-3xl group-hover:bg-white transition-colors">
                  <FaPrint />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 group-hover:text-white text-xl tracking-tight transition-colors">Cetak Kartu Ujian</h4>
                  <p className="text-slate-500 group-hover:text-green-100 font-medium mt-1 transition-colors">Unduh PDF Kartu Peserta dan ketahui lokasi tes Anda.</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-300 group-hover:text-white text-2xl transition-colors" />
            </Link>

            <Link to="/siswa/hasil-seleksi" className="group bg-white hover:bg-indigo-600 border border-slate-200 hover:border-transparent transition-all duration-300 rounded-3xl p-8 flex items-center justify-between shadow-xl shadow-slate-200/50 cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl group-hover:bg-white transition-colors">
                  <FaBullhorn />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 group-hover:text-white text-xl tracking-tight transition-colors">Pengumuman Kelulusan</h4>
                  <p className="text-slate-500 group-hover:text-indigo-100 font-medium mt-1 transition-colors">Cek hasil akhir seleksi tes masuk SPMB di sini.</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-300 group-hover:text-white text-2xl transition-colors" />
            </Link>

          </div>
        );

      case 'REJECTED':
        return (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center shadow-lg shadow-red-100">
            <div className="w-24 h-24 bg-white text-red-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-sm">
              <FaTimesCircle />
            </div>
            <h3 className="text-2xl font-black text-red-900 mb-3 tracking-tight">Status: Pendaftaran Ditolak</h3>
            <p className="text-red-800 leading-relaxed font-medium max-w-2xl mx-auto">
              Berdasarkan hasil verifikasi Panitia, mohon maaf Anda tidak memenuhi syarat atau kualifikasi pendaftaran SPMB tahun ini.
            </p>
          </div>
        );

      default:
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-3xl p-10 text-center shadow-lg shadow-blue-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>
            <div className="w-24 h-24 bg-white text-blue-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-sm">
              <FaClock />
            </div>
            <h3 className="text-2xl font-black text-blue-900 mb-3 tracking-tight">Status: Menunggu Verifikasi</h3>
            <p className="text-blue-800 leading-relaxed font-medium max-w-2xl mx-auto">
              Berkas pendaftaran Anda telah kami terima dan saat ini masuk ke dalam antrean pengecekan oleh Panitia Admin. Mohon cek halaman ini secara berkala.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER DASHBOARD */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
          <div>
            <h2 className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase mb-2">Portal Calon Siswa SPMB</h2>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Halo, {userData.name}!</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 font-bold transition-all px-4 py-2 hover:bg-red-50 rounded-xl">
            <FaSignOutAlt /> Keluar Sistem
          </button>
        </div>

        {/* KONTEN UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderStatusAndMenu()}
          </div>
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10">
                <h4 className="font-black text-xl mb-6 flex items-center gap-3">
                  <FaInfoCircle className="text-blue-400" /> Pusat Bantuan
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                  Pastikan nomor telepon/WhatsApp Anda selalu aktif selama masa pendaftaran. Jika mengalami kendala teknis sistem, segera hubungi admin.
                </p>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 backdrop-blur-sm">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">WhatsApp Panitia (CS)</p>
                    <p className="text-xl font-bold tracking-tight">0815-4117-9123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}