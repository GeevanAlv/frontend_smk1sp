import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserGraduate, FaUpload, FaSave, FaInfoCircle, FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function SiswaDaftar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Deteksi apakah ini mode revisi
  const isRevisi = location.state?.isRevisi || false;
  const notesToRevise = location.state?.notes || [];

  const [formData, setFormData] = useState({
    nama: '', no_hp: '', nisn: '', asal_sekolah: '', 
    akreditasi_sekolah: '', alamat: '', jurusan: '',
  });

  const [berkas, setBerkas] = useState({
    kartu_keluarga: null, akta_kelahiran: null, surat_keterangan_lulus: null, 
    raport: null, pas_foto: null, ktp_ayah: null, ktp_ibu: null, sptjm: null,
    sk_osis: null, sk_pramuka: null,
  });

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { 
      Swal.fire({
        icon: 'error', title: 'File Terlalu Besar',
        text: 'Maksimal ukuran file adalah 5MB sesuai aturan server.',
      });
      e.target.value = null;
      return;
    }
    setBerkas({ ...berkas, [e.target.name]: file });
  };

  // Fungsi cek apakah file ini yang disuruh revisi
  const isFileNeedRevision = (fileId) => {
    return notesToRevise.some(note => note.type.toLowerCase() === fileId.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isRevisi && formData.nisn.length !== 10) {
      return Swal.fire('Data Tidak Valid', 'NISN harus berjumlah 10 digit angka.', 'error');
    }

    Swal.fire({
      title: isRevisi ? 'Kirim Revisi Berkas?' : 'Kirim Pendaftaran SPMB?',
      text: isRevisi ? "Pastikan berkas perbaikan sudah benar." : "Pastikan semua data sudah benar.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      confirmButtonText: 'Ya, Kirim Sekarang!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        Swal.fire({
          title: 'Sedang Mengunggah...',
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading(); }
        });

        try {
          const dataToSend = new FormData();

          // Jika BUKAN revisi (daftar baru), kirim data teks. 
          // Jika revisi, Teks TIDAK DIKIRIM agar tidak menimpa database jadi kosong.
          if (!isRevisi) {
            Object.keys(formData).forEach(key => {
              dataToSend.append(key, formData[key]);
            });
          }

          // Kirim file yang diisi saja
          Object.keys(berkas).forEach(key => {
            if (berkas[key]) {
              dataToSend.append(key, berkas[key]);
            }
          });

          if (isRevisi) {
            await api.patch('/berkas/edit', dataToSend, { headers: { 'Content-Type': 'multipart/form-data' }});
          } else {
            await api.post('/berkas/upload', dataToSend, { headers: { 'Content-Type': 'multipart/form-data' }});
          }

          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: isRevisi ? 'Revisi berkas berhasil dikirim.' : 'Pendaftaran berhasil dikirim.',
          }).then(() => navigate('/siswa/dashboard'));

        } catch (error) {
          const pesanError = error.response?.data?.message || 'Gagal terhubung ke server.';
          Swal.fire('Upload Gagal', typeof pesanError === 'object' ? pesanError[0] : pesanError, 'error');
        }
      }
    });
  };

  const daftarFile = [
    { id: 'kartu_keluarga', label: 'Kartu Keluarga (KK)', req: true },
    { id: 'akta_kelahiran', label: 'Akta Kelahiran', req: true },
    { id: 'surat_keterangan_lulus', label: 'SKL / Ijazah SMP', req: true },
    { id: 'raport', label: 'Scan Rapor', req: true },
    { id: 'pas_foto', label: 'Pas Foto 3x4 (Merah)', req: true },
    { id: 'ktp_ayah', label: 'Scan KTP Ayah', req: true },
    { id: 'ktp_ibu', label: 'Scan KTP Ibu', req: true },
    { id: 'sptjm', label: 'Surat SPTJM (Bermaterai)', req: true },
    { id: 'sk_osis', label: 'SK Pengurus OSIS', req: false },
    { id: 'sk_pramuka', label: 'SK Kegiatan Pramuka', req: false },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate('/siswa/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-semibold">
          <FaArrowLeft /> Kembali ke Dashboard
        </button>

        <div className="mb-8 border-b border-slate-200 pb-6">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-1">
            {isRevisi ? 'Perbaikan Berkas' : 'Formulir Online'}
          </h2>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isRevisi ? 'Revisi Dokumen Pendaftaran' : 'Lengkapi Biodata & Berkas'}
          </h1>
          {isRevisi && (
             <div className="mt-4 bg-amber-100 text-amber-800 p-4 rounded-xl text-sm font-medium border border-amber-200 flex gap-3 items-center">
                <FaExclamationCircle className="text-xl shrink-0"/>
                <p>Silakan unggah dokumen pengganti untuk berkas yang ditolak oleh panitia di bawah ini.</p>
             </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ========================================================= */}
          {/* SECTION 1: HANYA MUNCUL JIKA DAFTAR BARU (BUKAN REVISI) */}
          {/* ========================================================= */}
          {!isRevisi && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <FaUserGraduate className="text-blue-600" /> Data Pribadi & Akademik
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                  <input type="text" name="nama" required value={formData.nama} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 py-3 px-4 border" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">NISN</label>
                  <input type="number" name="nisn" required value={formData.nisn} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 py-3 px-4 border" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">No. HP / WhatsApp</label>
                  <input type="tel" name="no_hp" required value={formData.no_hp} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 py-3 px-4 border" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Asal Sekolah</label>
                  <input type="text" name="asal_sekolah" required value={formData.asal_sekolah} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 py-3 px-4 border" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Akreditasi</label>
                  <input type="text" name="akreditasi_sekolah" required value={formData.akreditasi_sekolah} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 py-3 px-4 border" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Lengkap</label>
                  <textarea name="alamat" required value={formData.alamat} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 py-3 px-4 border" rows="2"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pilihan Jurusan</label>
                  <select name="jurusan" required value={formData.jurusan} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 py-3 px-4 border bg-white">
                    <option value="" disabled>-- Pilih Jurusan --</option>
                    <option value="TKJ">Teknik Komputer & Jaringan (TKJ)</option>
                    <option value="ATP">Agribisnis Tanaman Perkebunan (ATP)</option>
                    <option value="TKR">Teknik Kendaraan Ringan (TKR)</option>
                    <option value="AK">Akuntansi & Keuangan Lembaga (AKL)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SECTION 2: UPLOAD BERKAS (FILTER OTOMATIS)                */}
          {/* ========================================================= */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
              <FaUpload className="text-blue-600" /> {isRevisi ? 'Unggah Ulang Berkas Revisi' : 'Unggah Berkas Persyaratan'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {daftarFile
                // Trik Utama: Saring! Kalau revisi, cuma tampilkan yang salah saja!
                .filter(item => isRevisi ? isFileNeedRevision(item.id) : true)
                .map((item) => {
                  
                  // Jika lolos filter saat revisi, berarti ini PASTI berkas yang error.
                  // Status required otomatis true jika ini pendaftaran baru (untuk berkas inti) atau jika revisi.
                  const isRequiredInput = isRevisi ? true : item.req;

                  return (
                    <div key={item.id} className={`p-4 rounded-xl transition-all border ${isRevisi ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <label className={`block text-xs font-bold uppercase tracking-tight ${isRevisi ? 'text-red-700' : 'text-slate-700'}`}>
                          {item.label} {isRequiredInput && <span className="text-red-500">*</span>}
                          {!item.req && !isRevisi && <span className="text-slate-400 normal-case font-medium"> (Opsional)</span>}
                        </label>
                        {isRevisi && <FaExclamationCircle className="text-red-500 animate-pulse" title="Berkas Perlu Diperbaiki" />}
                      </div>
                      
                      {isRevisi && <p className="text-[10px] text-red-600 font-bold mb-2 uppercase tracking-widest">Wajib diganti dengan file baru!</p>}
                      
                      <input 
                        type="file" 
                        name={item.id} 
                        required={isRequiredInput} 
                        onChange={handleFileChange} 
                        accept=".jpg,.jpeg,.png,.pdf"
                        className={`block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold ${isRevisi ? 'file:bg-red-600 file:text-white' : 'file:bg-slate-200 file:text-slate-700'} cursor-pointer`} 
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 text-blue-800">
              <FaInfoCircle className="text-xl shrink-0" />
              <p className="text-xs leading-relaxed">Pastikan file yang diunggah dapat terbaca jelas.</p>
            </div>
            <button type="submit" className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95">
              <FaSave /> {isRevisi ? 'Kirim Revisi Berkas' : 'Simpan Pendaftaran'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}