import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaLeaf, FaCarSide, FaNetworkWired, FaCalculator, FaCheckCircle, FaUserTie, FaBuilding, FaUsers } from 'react-icons/fa';

// Import Hooks Canggih dari Framer Motion
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// =====================================================================
// KOMPONEN RAHASIA: SPOTLIGHT CARD (Cahaya Mengikuti Kursor Mouse)
// =====================================================================
function SpotlightCard({ children, className = "" }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 transition-shadow hover:shadow-2xl hover:shadow-blue-900/20 ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Elemen Cahaya Glow yang di-render oleh GPU */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(37, 99, 235, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* Konten Asli Kartu */}
      <div className="relative z-10 p-8 h-full">
        {children}
      </div>
    </div>
  );
}

// =====================================================================
// HALAMAN UTAMA (HOME)
// =====================================================================
export default function Home() {
  // 1. Setup untuk Scroll Progress Bar di paling atas layar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. Setup untuk Efek Parallax Gambar Kepala Sekolah
  const parallaxRef = useRef(null);
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  // Gambar akan bergerak ke atas (Y: -80px) saat di-scroll
  const yParallax = useTransform(parallaxProgress, [0, 1], [50, -80]);

  const slides = [
    { id: 1, img: "/bg1.jpg", title: "Seleksi Penerimaan Siswa Baru", subtitle: "Tahun Ajaran 2026/2027" },
    { id: 2, img: "/bg2.jpg", title: "Fasilitas Praktik Modern", subtitle: "Standar Industri Masa Kini" },
  ];

  const jurusan = [
    { icon: <FaLeaf />, nama: "Agribisnis Tanaman Perkebunan (ATP)", desc: "Teknik budidaya, pembibitan, perawatan, hingga pengolahan hasil perkebunan secara profesional.", warna: "text-green-500 bg-green-500/10 border border-green-500/20" },
    { icon: <FaCarSide />, nama: "Teknik Kendaraan Ringan (TKRO)", desc: "Fokus perawatan, perbaikan mesin, sasis, dan sistem kelistrikan pada kendaraan otomotif.", warna: "text-red-500 bg-red-500/10 border border-red-500/20" },
    { icon: <FaNetworkWired />, nama: "Teknik Komputer & Jaringan (TKJ)", desc: "Perakitan komputer, jaringan LAN/WAN, konfigurasi Mikrotik, hingga administrasi server.", warna: "text-blue-500 bg-blue-500/10 border border-blue-500/20" },
    { icon: <FaCalculator />, nama: "Akuntansi & Keuangan (AKL)", desc: "Terampil dalam pengelolaan pembukuan, administrasi keuangan, dan sistem perpajakan digital.", warna: "text-amber-500 bg-amber-500/10 border border-amber-500/20" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen relative">
      
      {/* EFEK 1: SCROLL PROGRESS BAR (Menempel di atas layar) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* HERO SECTION */}
      <ScrollReveal direction="up" delay={0}>
        <section className="relative h-[85vh]">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-full w-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.img})` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">
                    <motion.span 
                      initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                      className="inline-block py-1 px-3 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 w-max backdrop-blur-sm"
                    >
                      SPMB Online Terbuka
                    </motion.span>
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight max-w-3xl"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
                      className="text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed"
                    >
                      {slide.subtitle}. Wujudkan impianmu menjadi tenaga ahli profesional dan mandiri bersama SMKN 1 Simpang Pematang.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex flex-wrap gap-4">
                      <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95">
                        Buat Akun Pendaftaran
                      </Link>
                      <Link to="/alur" className="bg-white/5 text-white border border-white/20 px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 backdrop-blur-md transition-colors active:scale-95">
                        Pelajari Alur
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </ScrollReveal>

      {/* STATISTIK */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 border border-white">
          {[
            { angka: "B", label: "Akreditasi Sekolah", icon: <FaCheckCircle className="text-green-500" /> },
            { angka: "52", label: "Tenaga Pendidik", icon: <FaUserTie className="text-blue-500" /> },
            { angka: "780", label: "Siswa Aktif", icon: <FaUsers className="text-orange-500" /> },
            { angka: "21", label: "Ruang Kelas", icon: <FaBuilding className="text-purple-500" /> },
          ].map((stat, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.15}>
              <div className="text-center group">
                <div className="flex justify-center text-3xl mb-3 transform group-hover:-translate-y-2 transition-transform duration-300">{stat.icon}</div>
                <h4 className="text-4xl font-black text-slate-800 tracking-tight">{stat.angka}</h4>
                <p className="text-slate-500 text-sm mt-1 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SAMBUTAN KEPALA SEKOLAH DENGAN EFEK PARALLAX (VERSI LEBIH RAMPING) */}
      <section ref={parallaxRef} className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* KOLOM FOTO (Sekarang lebih kecil, mengambil 5/12 porsi layar) */}
          <div className="w-full lg:w-5/12 relative mx-auto max-w-md lg:max-w-none">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="absolute inset-0 bg-blue-600 rounded-2xl transform translate-x-4 translate-y-4 opacity-20"></div>
              {/* Tinggi diturunkan ke 380px */}
              <div className="overflow-hidden rounded-2xl shadow-xl relative h-[380px] w-full">
                <motion.img 
                  style={{ y: yParallax, scale: 1.15 }} 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=0&w=800" 
                  alt="Kepala Sekolah" 
                  className="absolute top-0 left-0 w-full h-[125%] object-cover origin-center" 
                />
              </div>
            </ScrollReveal>
          </div>

          {/* KOLOM TEKS (Lebih lebar, mengambil 7/12 porsi layar) */}
          <div className="w-full lg:w-7/12 space-y-6">
            <ScrollReveal direction="left" delay={0.4}>
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="h-px w-6 bg-blue-600"></span>
                <h4 className="text-blue-600 font-bold tracking-widest uppercase text-xs">Sambutan Kepala Sekolah</h4>
              </div>
              
              {/* Ukuran font diturunkan satu tingkat */}
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Mencetak Lulusan yang Siap <span className="text-blue-600">Bekerja & Berwirausaha</span>
              </h2>
              
              {/* Teks paragraf dibuat ukuran standar base */}
              <p className="text-slate-600 leading-relaxed text-base text-justify font-medium">
                "Selamat datang di portal SPMB SMKN 1 Simpang Pematang. Kami berkomitmen memberikan layanan pendidikan vokasi terbaik dengan fasilitas pembelajaran yang memadai. Dengan rasio ideal siswa dan guru, kami memastikan setiap peserta didik siap menghadapi tantangan dunia industri."
              </p>
              
              {/* Info nama dan jabatan lebih rapi */}
              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">S</div>
                <div>
                  <h5 className="font-black text-slate-900 text-lg tracking-tight">Suryadi, S.Pd., M.M.</h5>
                  <p className="text-blue-600 font-bold text-xs tracking-wide">Kepala SMKN 1 Simpang Pematang</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* EFEK 3: PROGRAM KEAHLIAN DENGAN SPOTLIGHT GLOW MOUSE */}
      <section className="bg-slate-950 py-32 relative overflow-hidden">
        {/* Dekorasi Background Ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center mb-20">
              <h4 className="text-blue-500 font-black tracking-[0.2em] uppercase text-xs mb-3">Pilihan Jurusan</h4>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Program Keahlian Unggulan</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jurusan.map((j, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.15}>
                {/* INI DIA KOMPONEN SPOTLIGHT CANGGIHNYA */}
                <SpotlightCard className="h-full">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 ${j.warna} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                    {j.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 leading-snug">{j.nama}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{j.desc}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}