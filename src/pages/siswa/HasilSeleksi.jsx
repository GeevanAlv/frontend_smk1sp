import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrophy, FaTimesCircle, FaClock, FaBullhorn, FaSyncAlt } from 'react-icons/fa';
import api from '../../services/api';

export default function HasilSeleksi() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statusLulus, setStatusLulus] = useState('LOCKED'); 
  const [pesanPanitia, setPesanPanitia] = useState('');
  
  const [targetTime, setTargetTime] = useState(null);
  const [countdown, setCountdown] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: false
  });

  // =========================================================================
  // 1. FUNGSI UTAMA: Memproses Respon Arief & Mengubah Layar
  // =========================================================================
  const prosesResponArief = (resData) => {
    if (resData.success === false) {
      // Jika status dari Arief masih false (Pengumuman belum dirilis)
      if (resData.data?.published_at) {
        setTargetTime(new Date(resData.data.published_at).getTime());
      }
      setStatusLulus('LOCKED');
    } else {
      // Jika Arief sudah merilis hasil (success: true)
      const data = resData.data || resData;
      if (!data) return;
      
      const statusDariBackend = data.status || data.status_kelulusan; 
      const statusBaku = typeof statusDariBackend === 'string' ? statusDariBackend.toLowerCase() : '';

      if (statusBaku === 'passed') {
        setStatusLulus('LULUS');
      } else if (statusBaku === 'failed') {
        setStatusLulus('TIDAK_LULUS');
      } else {
        setStatusLulus('LOCKED'); 
      }
      
      setPesanPanitia(data.catatan || data.message || '');
      setCountdown(prev => ({ ...prev, isTimeUp: true })); 
    }
  };

  // =========================================================================
  // 2. AMBIL DATA SAAT HALAMAN PERTAMA KALI DIBUKA
  // =========================================================================
  useEffect(() => {
    const checkPengumumanAwal = async () => {
      try {
        const response = await api.get('/announcements/me');
        prosesResponArief(response.data); 
      } catch (error) {
        if (error.response?.data) {
          prosesResponArief(error.response.data); 
        } else {
          setStatusLulus('LOCKED');
        }
      } finally {
        setLoading(false);
      }
    };
    checkPengumumanAwal();
  }, []);

  // =========================================================================
  // 3. LOGIKA HITUNG MUNDUR (COUNTDOWN TIMER)
  // =========================================================================
  useEffect(() => {
    if (!targetTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        // Waktu habis! Hentikan timer dan set ke 0
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true });
      } else {
        // Lanjutkan hitung mundur
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds, isTimeUp: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  // =========================================================================
  // 4. LOGIKA AUTO-REFRESH (POLLING 5 DETIK) SAAT WAKTU HABIS
  // =========================================================================
  useEffect(() => {
    let pollInterval;

    // Jika waktu habis (isTimeUp) TAPI status masih belum dirilis (LOCKED)
    if (countdown.isTimeUp && statusLulus === 'LOCKED') {
      console.log("Waktu habis! Memulai Auto-Refresh setiap 5 detik...");
      
      // Jalankan fungsi tembak API secara berulang setiap 5 detik (5000 ms)
      pollInterval = setInterval(async () => {
        try {
          const response = await api.get('/announcements/me');
          prosesResponArief(response.data);
        } catch (error) {
          if (error.response?.data) {
            prosesResponArief(error.response.data);
          }
        }
      }, 5000); 
    }

    // Bersihkan interval jika statusLulus sudah berubah jadi LULUS/TIDAK LULUS
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [countdown.isTimeUp, statusLulus]);

  // =========================================================================
  // TAMPILAN UI (HTML)
  // =========================================================================
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-slate-500 font-bold">Sinkronisasi waktu pengumuman...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate('/siswa/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-semibold transition-colors">
          <FaArrowLeft /> Kembali ke Dashboard
        </button>

        <div className="mb-8 border-b border-slate-200 pb-6">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-1">Tahap Akhir</h2>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pengumuman Kelulusan</h1>
        </div>

        {/* LAYOUT 1: WAKTU BELUM HABIS (HITUNG MUNDUR) */}
        {statusLulus === 'LOCKED' && !countdown.isTimeUp && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-slate-200/40">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 border-4 border-blue-100 animate-bounce">
              <FaClock />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Hitung Mundur Pengumuman Hasil</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto mb-8 text-sm">
              Sistem menyinkronkan waktu rilis langsung dari server. Gerbang kelulusan akan terbuka saat timer menyentuh angka nol.
            </p>

            <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-sm mx-auto mb-4">
              <div className="bg-slate-900 text-white rounded-2xl p-3 md:p-4 shadow-md">
                <span className="block text-2xl md:text-3xl font-black tracking-tight">{String(countdown.days).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-1 block">Hari</span>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-3 md:p-4 shadow-md">
                <span className="block text-2xl md:text-3xl font-black tracking-tight">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-1 block">Jam</span>
              </div>
              <div className="bg-slate-900 text-white rounded-2xl p-3 md:p-4 shadow-md">
                <span className="block text-2xl md:text-3xl font-black tracking-tight">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mt-1 block">Menit</span>
              </div>
              <div className="bg-red-600 text-white rounded-2xl p-3 md:p-4 shadow-md animate-pulse">
                <span className="block text-2xl md:text-3xl font-black tracking-tight">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase text-red-200 font-bold tracking-wider mt-1 block">Detik</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-bold italic mt-4">Zona waktu otomatis dikonversi ke waktu lokal perangkat Anda (WIB).</p>
          </div>
        )}

        {/* LAYOUT 2: WAKTU HABIS TAPI DATA BELUM DIKASIH ARIEF (SEDANG AUTO-REFRESH) */}
        {statusLulus === 'LOCKED' && countdown.isTimeUp && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl border-4 border-amber-100">
                <FaSyncAlt className="animate-spin" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Sinkronisasi Data Kelulusan</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto text-sm leading-relaxed">
              Waktu hitung mundur selesai. Sistem sedang menyinkronkan data final dari Panitia. 
              <br/><span className="text-amber-600 font-bold">Mohon tunggu, halaman akan memperbarui sendiri secara otomatis...</span>
            </p>
          </div>
        )}

        {/* LAYOUT 3: HASIL LULUS (PASSED) */}
        {statusLulus === 'LULUS' && (
          <div className="bg-white border border-green-200 rounded-3xl p-10 text-center shadow-2xl shadow-green-100/50 relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
            <div className="w-28 h-28 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-6xl mx-auto mb-6 border-4 border-green-100">
              <FaTrophy />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">SELAMAT! ANDA LULUS</h2>
            <p className="text-lg text-slate-600 font-medium mb-6 max-w-lg mx-auto leading-relaxed">
              Selamat, Anda telah memenuhi kriteria seleksi dan resmi diterima sebagai calon siswa baru.
            </p>
            {pesanPanitia && (
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm font-bold text-slate-700">
                Catatan Panitia: {pesanPanitia}
              </div>
            )}
          </div>
        )}

        {/* LAYOUT 4: HASIL TIDAK LULUS (FAILED) */}
        {statusLulus === 'TIDAK_LULUS' && (
          <div className="bg-white border border-red-200 rounded-3xl p-10 text-center shadow-xl shadow-red-100/50 relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-6xl mx-auto mb-6">
              <FaTimesCircle />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">MOHON MAAF</h2>
            <p className="text-lg text-slate-600 font-medium mb-6 max-w-lg mx-auto leading-relaxed">
              Berdasarkan hasil tes seleksi, Anda dinyatakan <b>TIDAK LULUS</b>. Jangan patah semangat dan teruslah berjuang!
            </p>
            {pesanPanitia && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-sm font-bold text-red-800">
                Catatan Panitia: {pesanPanitia}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}