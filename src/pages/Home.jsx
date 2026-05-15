import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaLeaf, FaCarSide, FaNetworkWired, FaCalculator, FaCheckCircle, FaUserTie, FaBuilding, FaUsers } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function Home() {
  const slides = [
    { 
      id: 1, 
      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600", 
      title: "Seleksi Penerimaan Mahasiswa Baru", // Sudah diubah ke SPMB
      subtitle: "Tahun Ajaran 2026/2027" 
    },
    { 
      id: 2, 
      img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1600", 
      title: "Fasilitas Praktik Modern", 
      subtitle: "Standar Industri Masa Kini" 
    },
  ];

  const jurusan = [
    { 
      icon: <FaLeaf />, 
      nama: "Agribisnis Tanaman Perkebunan (ATP)", 
      desc: "Mempelajari teknik budidaya, pembibitan, perawatan, hingga pengolahan hasil komoditas perkebunan secara profesional.", 
      warna: "bg-green-100 text-green-600 hover:bg-green-500 hover:text-white" 
    },
    { 
      icon: <FaCarSide />, 
      nama: "Teknik Kendaraan Ringan (TKRO)", 
      desc: "Fokus pada keahlian perawatan, perbaikan mesin, sasis, dan sistem kelistrikan pada kendaraan otomotif (mobil).", 
      warna: "bg-red-100 text-red-600 hover:bg-red-500 hover:text-white" 
    },
    { 
      icon: <FaNetworkWired />, 
      nama: "Teknik Komputer & Jaringan (TKJ)", 
      desc: "Mempelajari perakitan komputer, instalasi jaringan LAN/WAN, konfigurasi Mikrotik, hingga administrasi server.", 
      warna: "bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white" 
    },
    { 
      icon: <FaCalculator />, 
      nama: "Akuntansi & Keuangan Lembaga (AKL)", 
      desc: "Mencetak tenaga kerja yang terampil dalam pengelolaan pembukuan, administrasi keuangan, dan sistem perpajakan digital.", 
      warna: "bg-amber-100 text-amber-600 hover:bg-amber-500 hover:text-white" 
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">
                  <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-bold tracking-widest uppercase mb-6 w-max backdrop-blur-sm">
                    SPMB Online Terbuka
                  </span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight max-w-3xl">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-slate-300 mb-10 max-w-2xl font-light">
                    {slide.subtitle}. Wujudkan impianmu menjadi tenaga ahli profesional dan mandiri bersama SMKN 1 Simpang Pematang.
                  </p>
                  <div className="flex gap-4">
                    {/* PERBAIKAN: Link diubah dari /daftar menjadi /register agar sesuai App.jsx */}
                    <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 active:scale-95">
                      Buat Akun Pendaftaran
                    </Link>
                    <Link to="/alur" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/20 backdrop-blur-md transition active:scale-95">
                      Pelajari Alur
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. STATISTIK KEPERCAYAAN */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 border border-slate-100">
          {[
            { angka: "B", label: "Akreditasi Sekolah", icon: <FaCheckCircle className="text-green-500" /> },
            { angka: "52", label: "Tenaga Pendidik (Guru)", icon: <FaUserTie className="text-blue-500" /> },
            { angka: "780", label: "Siswa Aktif", icon: <FaUsers className="text-orange-500" /> },
            { angka: "21", label: "Ruang Kelas Layak", icon: <FaBuilding className="text-purple-500" /> },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center text-3xl mb-3">{stat.icon}</div>
              <h4 className="text-3xl font-extrabold text-slate-800">{stat.angka}</h4>
              <p className="text-slate-500 text-sm mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SAMBUTAN KEPALA SEKOLAH */}
      <section className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl transform translate-x-4 translate-y-4"></div>
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" alt="Kepala Sekolah" className="relative rounded-2xl shadow-lg w-full object-cover h-[500px]" />
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h4 className="text-blue-600 font-bold tracking-wider uppercase text-sm">Sambutan Kepala Sekolah</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">Mencetak Lulusan yang Siap Bekerja dan Berwirausaha</h2>
            <p className="text-slate-600 leading-relaxed text-lg text-justify">
              "Selamat datang di portal SPMB SMKN 1 Simpang Pematang. Kami berkomitmen untuk memberikan layanan pendidikan vokasi terbaik dengan fasilitas pembelajaran yang memadai. Dengan rasio ideal siswa dan guru, kami memastikan setiap peserta didik mendapatkan bimbingan optimal untuk mengembangkan kompetensinya sesuai kebutuhan dunia industri saat ini."
            </p>
            <div className="pt-4 border-t border-slate-200">
              <h5 className="font-bold text-slate-900 text-xl">Suryadi</h5>
              <p className="text-slate-500">Kepala SMKN 1 Simpang Pematang</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAM KEAHLIAN */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2">Pilihan Jurusan</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Program Keahlian Unggulan</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jurusan.map((j, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:bg-slate-750 transition-colors group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${j.warna} group-hover:scale-110 transition-transform`}>
                  {j.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{j.nama}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}