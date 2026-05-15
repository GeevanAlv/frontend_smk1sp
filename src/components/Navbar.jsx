import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaSignInAlt } from 'react-icons/fa';
// Import logo dari folder assets
import logoSekolah from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Jurusan', path: '/jurusan' },
    { name: 'Alur & Info', path: '/alur' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 shadow-sm">
      {/* Top Bar (Info Kontak) */}
      <div className="bg-slate-900 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between text-xs font-medium">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><FaEnvelope className="text-blue-400" /> smknsatusp@gmail.com</span>
            <span className="flex items-center gap-2"><FaPhoneAlt className="text-blue-400" /> 0815-4117-9123</span>
          </div>
          <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-400" /> Mesuji, Lampung</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            
            {/* Logo & Branding */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logoSekolah} 
                alt="Logo SMKN 1 Simpang Pematang" 
                className="w-12 h-12 object-contain group-hover:rotate-3 transition-transform duration-300" 
              />
              <div>
                <h1 className="text-xl font-extrabold text-slate-800 leading-tight">SPMB SMKN 1</h1>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Simpang Pematang</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-bold transition-colors ${
                    isActive(item.path) ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/login" 
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
              >
                <FaSignInAlt /> Portal Siswa
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 text-2xl">
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 py-4 px-4 space-y-3 shadow-xl">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block py-3 px-4 rounded-xl font-bold ${
                isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)}
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-bold"
          >
            Masuk ke Portal
          </Link>
        </div>
      )}
    </nav>
  );
}