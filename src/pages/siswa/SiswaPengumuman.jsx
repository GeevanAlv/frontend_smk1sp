import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaIdBadge, FaCalendarAlt, FaMapMarkerAlt, FaDownload, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function SiswaPengumuman() {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await api.get('/cards/me');
        
        // =========================================================================
        // 🕵️‍♂️ PERBAIKAN DI SINI: Mengambil response.data.data karena dibungkus Arief
        // =========================================================================
        if (response.data?.data) {
          setCardData(response.data.data);
        } else {
          setCardData(response.data); // Jaga-jaga kalau Arief tidak membungkusnya
        }
        
      } catch (error) {
        console.log("Kartu belum siap atau berkas belum diverifikasi.");
        setCardData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCard();
  }, []);

  const handleDownloadPDF = async () => {
    Swal.fire({
      title: 'Mengunduh Dokumen...',
      text: 'Harap tunggu, sedang mengunduh file PDF Kartu Ujian.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const response = await api.get('/cards/me/download', {
        responseType: 'blob', // Wajib blob untuk file PDF
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Kartu_Ujian_SPMB.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.close();
    } catch (error) {
      Swal.fire('Gagal', 'Tidak dapat mengunduh kartu saat ini. Coba lagi nanti.', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-slate-500 font-bold">Memuat data kartu ujian...</p>
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
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-1">Tahap Seleksi</h2>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Informasi Tes & Kartu Ujian</h1>
        </div>

        {cardData ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            {/* Dekorasi Latar */}

            <div className="relative z-10">
              <div className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                Berkas Diverifikasi
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-8">Detail Jadwal Ujian Anda</h3>
              
              <div className="space-y-6 mb-10">
                {/* NOMOR PENDAFTARAN */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0"><FaIdBadge /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nomor Pendaftaran</p>
                    <p className="text-lg font-black text-slate-900">{cardData.no_daftar || '-'}</p>
                  </div>
                </div>

                {/* TANGGAL UJIAN */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0"><FaCalendarAlt /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tanggal & Waktu Ujian</p>
                    <p className="text-lg font-black text-slate-900">
                      {cardData.tanggal_test || '-'} | {cardData.jam_test || '-'} WIB
                    </p>
                  </div>
                </div>

                {/* LOKASI UJIAN */}
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0"><FaMapMarkerAlt /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Lokasi Ujian (Offline)</p>
                    <p className="text-lg font-black text-slate-900">{cardData.lokasi_test || '-'}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
              >
                <FaDownload /> Unduh PDF Kartu Ujian
              </button>
              <p className="text-xs text-slate-400 mt-4 font-medium italic">
                *Cetak kartu ini di kertas A4 dan bawa saat pelaksanaan tes beserta alat tulis.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
              <FaLock />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Kartu Ujian Belum Tersedia</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">
              Kartu ujian hanya dapat dicetak setelah berkas pendaftaran Anda diverifikasi dan disetujui oleh Panitia. Silakan pantau status di Dashboard Anda.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}