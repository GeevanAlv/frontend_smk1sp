import { Routes, Route, Navigate } from 'react-router-dom';

// 1. Import Komponen Utama
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 2. Import Halaman Publik & Auth
import Home from './pages/Home';
import Jurusan from './pages/Jurusan';
import Alur from './pages/Alur';
import Register from './pages/Register';
import Login from './pages/Login';

// 3. Import Halaman Portal Siswa (PASTIKAN FILE INI SUDAH ADA)
import DashboardSiswa from './pages/siswa/DashboardSiswa';
import SiswaDaftar from './pages/siswa/SiswaDaftar';
import SiswaPengumuman from './pages/siswa/SiswaPengumuman';
import HasilSeleksi from './pages/siswa/HasilSeleksi';

// 4. Komponen NotFound (Tetap di sini tidak apa-apa karena tidak ada duplikatnya)
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
    <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
    <p className="text-xl text-slate-600 mb-8">Oops! Halaman tidak ditemukan.</p>
    <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
      Kembali ke Beranda
    </a>
  </div>
);

export default function App() {
  return (
    <div className="font-sans text-slate-800 selection:bg-blue-200 flex flex-col min-h-screen">
      {/* Navbar akan selalu tampil di atas */}
      <Navbar />
      
      {/* Area Konten Utama yang berubah-ubah sesuai URL */}
      <main className="flex-grow pt-20"> {/* Tambah padding top agar konten tidak tertutup Navbar fixed */}
        <Routes>
          {/* AREA PUBLIK */}
          <Route path="/" element={<Home />} />
          <Route path="/jurusan" element={<Jurusan />} />
          <Route path="/alur" element={<Alur />} />
          
          {/* AREA OTENTIKASI */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* AREA PORTAL SISWA */}
          <Route path="/siswa">
            {/* Redirect /siswa langsung ke /siswa/dashboard */}
            <Route index element={<Navigate to="/siswa/dashboard" replace />} />
            
            <Route path="dashboard" element={<DashboardSiswa />} />
            <Route path="daftar" element={<SiswaDaftar />} />
            <Route path="pengumuman" element={<SiswaPengumuman />} />
          </Route>

          <Route path="/siswa/hasil-seleksi" element={<HasilSeleksi />} />

          {/* HALAMAN ERROR 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer akan selalu tampil di bawah */}
      <Footer />
    </div>
  );
}