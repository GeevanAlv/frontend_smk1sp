import { FaLeaf, FaCarSide, FaNetworkWired, FaCalculator, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Jurusan() {
  const daftarJurusan = [
    { 
      id: "atp",
      ikon: <FaLeaf />, 
      nama: "Agribisnis Tanaman Perkebunan", 
      singkatan: "ATP",
      desc: "Menyiapkan tenaga ahli madya di bidang perkebunan modern. Pembelajaran mencakup pembibitan, pemeliharaan, hingga pengolahan pasca panen komoditas menggunakan teknologi terapan.", 
      karir: ["Mandor Perkebunan", "Penyuluh Pertanian", "Quality Control Pabrik"]
    },
    { 
      id: "tkro",
      ikon: <FaCarSide />, 
      nama: "Teknik Kendaraan Ringan", 
      singkatan: "TKRO",
      desc: "Mencetak teknisi yang kompeten dalam perawatan dan perbaikan mesin otomotif, sasis, pemindahan tenaga, dan sistem kelistrikan mobil standar industri.", 
      karir: ["Mekanik Dealer Resmi", "Service Advisor", "Wirausaha Bengkel"]
    },
    { 
      id: "tkj",
      ikon: <FaNetworkWired />, 
      nama: "Teknik Komputer & Jaringan", 
      singkatan: "TKJ",
      desc: "Mempelajari perakitan komputer, instalasi jaringan fiber optic, konfigurasi router Mikrotik, keamanan jaringan, dan administrasi server tingkat lanjut.", 
      karir: ["Network Administrator", "IT Support", "Teknisi ISP"]
    },
    { 
      id: "akl",
      ikon: <FaCalculator />, 
      nama: "Akuntansi & Keuangan Lembaga", 
      singkatan: "AKL",
      desc: "Mendidik tenaga profesional di bidang pembukuan, penyusunan laporan keuangan, aplikasi komputer akuntansi, dan sistem perpajakan digital.", 
      karir: ["Staff Akunting", "Customer Service Bank", "Administrasi Pajak"]
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Header Minimalis */}
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
          SMKN 1 Simpang Pematang
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Program Keahlian
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Pilih jalur masa depanmu. Kami menyediakan empat program keahlian yang didesain secara presisi untuk memenuhi standar dan kebutuhan industri global.
        </p>
      </div>

      {/* Grid Jurusan yang Bersih (2x2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {daftarJurusan.map((jurusan) => (
            <div 
              key={jurusan.id} 
              className="group border border-slate-200 rounded-2xl p-8 sm:p-10 hover:border-blue-600 hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
            >
              {/* Header Card (Ikon + Judul) */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center text-2xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {jurusan.ikon}
                </div>
                <span className="text-sm font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-md">
                  {jurusan.singkatan}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {jurusan.nama}
              </h3>
              
              <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                {jurusan.desc}
              </p>

              {/* Garis Pembatas Halus */}
              <div className="w-full h-px bg-slate-100 mb-6"></div>

              {/* List Karir yang Rapi */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">
                  Fokus Karir Lulusan
                </h4>
                <ul className="space-y-3">
                  {jurusan.karir.map((karir, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600 font-medium">
                      <FaCheck className="text-blue-600 mr-3 shrink-0" />
                      {karir}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* CTA Bersih dan Elegan */}
      <div className="border-t border-slate-200 bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Siap Memulai Perjalananmu?
          </h2>
          <p className="text-slate-600 mb-8 text-lg">
            Proses pendaftaran kini lebih mudah dan sepenuhnya online. Siapkan berkas dan segera buat akun portal siswamu.
          </p>
          <Link 
            to="/login" 
            className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Masuk ke Portal Pendaftaran
          </Link>
        </div>
      </div>

    </div>
  );
}