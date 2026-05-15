import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Import logo dari folder assets
import logoSekolah from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & Logo Section */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-1.5 rounded-xl shadow-lg">
                <img 
                  src={logoSekolah} 
                  alt="Logo SMKN 1" 
                  className="w-14 h-14 object-contain" 
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white leading-tight">SMKN 1</h2>
                <p className="text-sm font-bold text-blue-400 tracking-[0.2em] uppercase">Simpang Pematang</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Mewujudkan tenaga kerja tingkat menengah yang profesional, berakhlak mulia, dan siap bersaing di era industri global.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><FaFacebook /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"><FaInstagram /></a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6">Navigasi</h3>
            <ul className="space-y-4">
              <li><Link to="/jurusan" className="hover:text-blue-400 flex items-center gap-2 group"><FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-all" /> Program Keahlian</Link></li>
              <li><Link to="/alur" className="hover:text-blue-400 flex items-center gap-2 group"><FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-all" /> Alur Pendaftaran</Link></li>
              <li><Link to="/login" className="hover:text-blue-400 flex items-center gap-2 group"><FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-all" /> Portal Siswa</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h3 className="text-white font-bold text-lg mb-6">Hubungi Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="mt-1 text-blue-500" />
                <p className="text-sm leading-relaxed">Jl. Jendral Sudirman, Simpang Pematang, Kec. Simpang Pematang, Kab. Mesuji, Lampung.</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-blue-500" />
                <p className="text-sm">0815-4117-9123</p>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-500" />
                <p className="text-sm">smknsatusp@gmail.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-800 pt-10 text-center">
          <p className="text-xs font-medium text-slate-500 tracking-widest uppercase">
            © {new Date().getFullYear()} SMKN 1 SIMPANG PEMATANG. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}