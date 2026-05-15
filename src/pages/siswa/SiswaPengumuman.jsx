import { useState, useEffect } from 'react';
import { FaPrint, FaTrophy, FaHourglassHalf } from 'react-icons/fa';

export default function SiswaPengumuman() {
  // SETTING WAKTU PENGUMUMAN (Tahun, Bulan-1, Tanggal, Jam, Menit, Detik)
  // Contoh: 1 Juli 2026 jam 08:00 pagi
  const countdownDate = new Date(2026, 6, 1, 8, 0, 0).getTime();

  const [timeLeft, setTimeLeft] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });
  const [isTimeUp, setIsTimeUp] = useState(false);

  // DUMMY DATA API
  const statusKelulusan = {
    diterima: true,
    jurusanDiterima: "Teknik Komputer & Jaringan (TKJ)"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsTimeUp(true);
      } else {
        setTimeLeft({
          hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
          jam: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          menit: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          detik: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-4">
        
        {!isTimeUp ? (
          /* TAMPILAN COUNTDOWN */
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-xl shadow-blue-900/5">
            <FaHourglassHalf className="text-6xl text-blue-500 mx-auto mb-6 animate-pulse" />
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Pengumuman Belum Dibuka</h1>
            <p className="text-slate-600 mb-10">Hasil seleksi PPDB SMKN 1 Simpang Pematang akan diumumkan dalam waktu:</p>
            
            <div className="flex justify-center gap-4 sm:gap-6">
              {Object.entries(timeLeft).map(([satuan, nilai]) => (
                <div key={satuan} className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl font-extrabold text-blue-600 border border-slate-200 shadow-inner">
                    {nilai < 10 ? `0${nilai}` : nilai}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-3">{satuan}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* TAMPILAN HASIL PENGUMUMAN */
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-xl">
            {statusKelulusan.diterima ? (
              <div>
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl text-green-600 mx-auto mb-6 shadow-inner">
                  <FaTrophy />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Selamat, Anda Diterima!</h1>
                <p className="text-slate-600 mb-8 text-lg">
                  Anda dinyatakan lulus seleksi PPDB SMKN 1 Simpang Pematang pada kompetensi keahlian:<br/>
                  <span className="font-bold text-blue-600 mt-2 block">{statusKelulusan.jurusanDiterima}</span>
                </p>
                <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
                  <FaPrint /> Cetak Bukti Kelulusan
                </button>
              </div>
            ) : (
              <div>
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-5xl text-red-600 mx-auto mb-6 shadow-inner">
                  &times;
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Mohon Maaf</h1>
                <p className="text-slate-600 mb-8 text-lg">
                  Berdasarkan hasil seleksi, Anda dinyatakan <strong>TIDAK LULUS</strong> pada PPDB SMKN 1 Simpang Pematang tahun ini. Tetap semangat dan pantang menyerah!
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}