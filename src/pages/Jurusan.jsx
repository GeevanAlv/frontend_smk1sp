import { FaLeaf, FaCarSide, FaNetworkWired, FaCalculator, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

// Import Komponen Custom
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';

export default function Jurusan() {
  // 1. Setup Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const daftarJurusan = [
    { 
      id: "atp", ikon: <FaLeaf />, nama: "Agribisnis Tanaman Perkebunan", singkatan: "ATP",
      desc: "Menyiapkan tenaga ahli madya di bidang perkebunan modern. Pembelajaran mencakup pembibitan, pemeliharaan, hingga pengolahan pasca panen komoditas.", 
      karir: ["Mandor Perkebunan", "Penyuluh Pertanian", "Quality Control Pabrik"]
    },
    { 
      id: "tkro", ikon: <FaCarSide />, nama: "Teknik Kendaraan Ringan", singkatan: "TKRO",
      desc: "Mencetak teknisi yang kompeten dalam perawatan dan perbaikan mesin otomotif, sasis, pemindahan tenaga, dan sistem kelistrikan standar industri.", 
      karir: ["Mekanik Dealer Resmi", "Service Advisor", "Wirausaha Bengkel"]
    },
    { 
      id: "tkj", ikon: <FaNetworkWired />, nama: "Teknik Komputer & Jaringan", singkatan: "TKJ",
      desc: "Mempelajari perakitan komputer, instalasi jaringan fiber optic, konfigurasi router Mikrotik, keamanan jaringan, dan administrasi server.", 
      karir: ["Network Administrator", "IT Support", "Teknisi ISP"]
    },
    { 
      id: "akl", ikon: <FaCalculator />, nama: "Akuntansi & Keuangan", singkatan: "AKL",
      desc: "Mendidik tenaga profesional di bidang pembukuan, penyusunan laporan keuangan, aplikasi komputer akuntansi, dan sistem perpajakan digital.", 
      karir: ["Staff Akunting", "Customer Service Bank", "Administrasi Pajak"]
    },
  ];

  return (
    <PageTransition>
      <div className="bg-white min-h-screen font-sans">
        
        {/* Scroll Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-50" style={{ scaleX }} />
        
        {/* Header Minimalis */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">SMKN 1 Simpang Pematang</h2>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Program Keahlian</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Pilih jalur masa depanmu. Kami menyediakan empat program keahlian yang didesain secara presisi untuk memenuhi standar industri global.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid Jurusan */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {daftarJurusan.map((jurusan, i) => (
              <ScrollReveal key={jurusan.id} direction="up" delay={i * 0.15}>
                <div className="group border border-slate-200 rounded-3xl p-8 sm:p-10 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 bg-white flex flex-col hover:-translate-y-2">
                  
                  {/* Header Card */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center text-3xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {jurusan.ikon}
                    </div>
                    <span className="text-xs font-black text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full tracking-widest uppercase group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {jurusan.singkatan}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight">
                    {jurusan.nama}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-8 flex-grow font-medium">
                    {jurusan.desc}
                  </p>

                  <div className="w-full h-px bg-slate-100 mb-8"></div>

                  {/* List Karir */}
                  <div>
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-5">Fokus Karir Lulusan</h4>
                    <ul className="space-y-4">
                      {jurusan.karir.map((karir, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-700 font-bold">
                          <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FaCheck size={10} />
                          </div>
                          {karir}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}

          </div>
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="border-t border-slate-100 bg-slate-50 py-20">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Siap Memulai Perjalananmu?</h2>
              <p className="text-slate-600 mb-10 text-lg font-medium">
                Proses pendaftaran kini lebih mudah dan sepenuhnya online. Siapkan berkas dan segera buat akun portal siswamu.
              </p>
              <Link 
                to="/register" 
                className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-1"
              >
                Buat Akun Pendaftaran
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </PageTransition>
  );
}