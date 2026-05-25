import { FaCalendarAlt, FaFileSignature, FaUserCheck, FaBullhorn, FaRegCheckCircle, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// 1. IMPORT HOOKS UNTUK GARIS LOADING DARI FRAMER MOTION
import { motion, useScroll, useSpring } from 'framer-motion';

// Import Komponen Custom untuk Animasi
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';

export default function Alur() {
  // ==========================================================
  // 2. SETUP EFEK GARIS LOADING (SCROLL PROGRESS)
  // ==========================================================
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const persyaratan = [
    "Fotokopi Ijazah (Lulusan 2025) / SKL Asli (Lulusan 2026)",
    "Surat Keterangan Akreditasi Sekolah",
    "Pas Foto 3x4 Background Merah (2 Lembar)",
    "Fotokopi Kartu Keluarga (KK)",
    "Fotokopi Akte Kelahiran",
    "Fotokopi KTP Ayah & Ibu",
    "Fotokopi Raport (Identitas s.d Semester 5)",
    "SPTJM (Surat Pertanggung Jawaban Mutlak)",
    "Materai 10.000 (3 Lembar)",
    "Fotokopi KIP/KIS (Bagi yang memiliki)",
    "Sertifikat / Piagam Prestasi (Bagi yang memiliki)",
    "SK Pengurus OSIS/Pramuka (Bagi yang memiliki)",
    "Map Snel"
  ];

  const jadwal = [
    { event: "Pendaftaran & Verifikasi Berkas", date: "15 - 19 Juni 2026", time: "07.30 - 15.00 WIB" },
    { event: "Tes Bakat dan Minat", date: "20 Juni 2026", time: "Sesuai Jadwal" },
    { event: "Pengumuman Hasil Seleksi", date: "24 Juni 2026", time: "Online / Sekolah" },
    { event: "Daftar Ulang Siswa", date: "24 - 25 Juni 2026", time: "08.00 - 14.00 WIB" },
    { event: "Hari Pertama Masuk Sekolah", date: "13 Juli 2026", time: "07.15 WIB" },
    { event: "MPLS", date: "13 - 17 Juli 2026", time: "Sesuai Jadwal" },
  ];

  return (
    <PageTransition>
      <div className="bg-slate-50 min-h-screen flex flex-col justify-between relative">
        
        {/* ========================================================== */}
        {/* 3. KOMPONEN GARIS LOADING (MENEMPEL DI ATAS LAYAR)         */}
        {/* ========================================================== */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-[60]"
          style={{ scaleX }}
        />
        
        <div>
          {/* Header */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-center">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">Informasi Resmi</h2>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Jadwal & Persyaratan SPMB</h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium">Tahun Pelajaran 2026/2027 SMKN 1 Simpang Pematang</p>
            </div>
          </ScrollReveal>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Kolom Kiri: Jadwal (Table Style) */}
            <div className="space-y-6">
              <ScrollReveal direction="right" delay={0.2}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                    <FaCalendarAlt size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Jadwal Pelaksanaan</h3>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/50 border-b border-slate-200">
                        <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Kegiatan</th>
                        <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Waktu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {jadwal.map((item, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors group">
                          <td className="p-5">
                            <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{item.event}</p>
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1.5">
                              <FaClock className="text-blue-500" /> {item.time}
                            </p>
                          </td>
                          <td className="p-5 text-sm font-bold text-slate-700">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollReveal>
            </div>

            {/* Kolom Kanan: Persyaratan (Checklist Style) */}
            <div className="space-y-6">
              <ScrollReveal direction="left" delay={0.4}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                    <FaFileSignature size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Persyaratan Berkas</h3>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50">
                  <div className="grid grid-cols-1 gap-2">
                    {persyaratan.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                        <FaRegCheckCircle className="text-blue-500 mt-0.5 shrink-0 text-lg group-hover:scale-110 transition-transform" />
                        <span className="text-sm md:text-base font-semibold text-slate-700 leading-relaxed group-hover:text-slate-900">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>

        {/* Footer CTA */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="bg-slate-900 py-16 text-center relative z-10 -mb-1 select-none">
            <h3 className="text-white font-black text-2xl md:text-3xl mb-6 tracking-tight">Siap Bergabung Bersama Kami?</h3>
            <Link to="/register" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all duration-300 shadow-xl shadow-blue-600/20 hover:-translate-y-1">
              Daftar Sekarang
            </Link>
          </div>
        </ScrollReveal>
        
      </div>
    </PageTransition>
  );
}