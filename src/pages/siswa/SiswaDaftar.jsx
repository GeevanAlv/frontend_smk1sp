import { useState } from 'react';
import { FaUserGraduate, FaBook, FaUpload, FaSave, FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function SiswaDaftar() {
  const [formData, setFormData] = useState({
    nisn: '', asalSekolah: '', jurusan: '', 
    nilai1: '', nilai2: '', nilai3: '', nilai4: '', nilai5: ''
  });

  const [berkas, setBerkas] = useState({
    kk: null, akta: null, skl: null, rapor: null, foto: null, 
    ktpOrtu: null, sptjm: null, piagam: null
  });

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { // Cek 2MB
      Swal.fire({
        icon: 'error',
        title: 'File Terlalu Besar',
        text: 'Maksimal ukuran file adalah 2MB.',
        confirmButtonColor: '#ef4444'
      });
      e.target.value = null; // Reset input file
      return;
    }
    setBerkas({ ...berkas, [e.target.name]: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validasi NISN (10 Digit)
    if (formData.nisn.length !== 10) {
      return Swal.fire({
        icon: 'error',
        title: 'Data Tidak Valid',
        text: 'NISN harus berjumlah 10 digit angka.',
      });
    }

    // 2. Validasi Nilai (Range 0-100)
    const nilaiArray = [formData.nilai1, formData.nilai2, formData.nilai3, formData.nilai4, formData.nilai5];
    if (nilaiArray.some(n => n > 100 || n < 0)) {
      return Swal.fire({
        icon: 'warning',
        title: 'Cek Nilai Rapor',
        text: 'Pastikan nilai yang diinput berada di rentang 0 - 100.',
      });
    }

    // 3. Konfirmasi Pengiriman
    Swal.fire({
      title: 'Kirim Pendaftaran SPMB?',
      text: "Pastikan semua data dan berkas sudah benar. Anda tidak dapat mengubah data setelah dikirim.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Kirim Sekarang!',
      cancelButtonText: 'Cek Kembali'
    }).then((result) => {
      if (result.isConfirmed) {
        // PROSES LOADING
        Swal.fire({
          title: 'Sedang Mengunggah...',
          text: 'Mohon jangan tutup halaman ini',
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading(); }
        });

        // Simulasi Kirim Data (Nanti diganti Axios)
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Data pendaftaran Anda telah diterima. Silakan cek dashboard secara berkala.',
            confirmButtonColor: '#2563eb'
          });
        }, 2000);
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 border-b border-slate-200 pb-6 flex justify-between items-end">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-1">Formulir Online</h2>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lengkapi Biodata & Berkas</h1>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Status: Pengisian Data</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: DATA AKADEMIK */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
              <FaUserGraduate className="text-blue-600" /> Data Akademik & Jurusan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">NISN (10 Digit)</label>
                <input type="number" name="nisn" required value={formData.nisn} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border transition-all" placeholder="Contoh: 0081234567" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Asal Sekolah (SMP/MTs)</label>
                <input type="text" name="asalSekolah" required value={formData.asalSekolah} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border transition-all" placeholder="Nama Sekolah Asal" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Pilihan Program Keahlian</label>
                <select name="jurusan" required value={formData.jurusan} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 py-3 px-4 border transition-all">
                  <option value="">-- Pilih Jurusan --</option>
                  <option value="ATP">Agribisnis Tanaman Perkebunan (ATP)</option>
                  <option value="TKRO">Teknik Kendaraan Ringan (TKRO)</option>
                  <option value="TKJ">Teknik Komputer & Jaringan (TKJ)</option>
                  <option value="AKL">Akuntansi & Keuangan Lembaga (AKL)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: NILAI RAPOR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
              <FaBook className="text-blue-600" /> Nilai Rata-Rata Rapor (Semester 1-5)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((smt) => (
                <div key={smt}>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Semester {smt}</label>
                  <input type="number" step="0.01" name={`nilai${smt}`} required value={formData[`nilai${smt}`]} onChange={handleTextChange} className="w-full border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-center py-3 border font-bold" placeholder="0.00" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400 flex items-center gap-2">
              <FaInfoCircle /> Gunakan nilai rata-rata per semester.
            </p>
          </div>

          {/* SECTION 3: UPLOAD BERKAS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
              <FaUpload className="text-blue-600" /> Unggah Berkas Persyaratan (Scan Asli)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'kk', label: 'Kartu Keluarga (KK)', req: true },
                { id: 'akta', label: 'Akta Kelahiran', req: true },
                { id: 'skl', label: 'SKL / Ijazah SMP', req: true },
                { id: 'rapor', label: 'Rapor Smt 1-5 (Identitas)', req: true },
                { id: 'foto', label: 'Pas Foto 3x4 (Merah)', req: true },
                { id: 'ktpOrtu', label: 'KTP Ayah & Ibu', req: true },
                { id: 'sptjm', label: 'Surat SPTJM (Bermaterai)', req: true },
                { id: 'piagam', label: 'Sertifikat Prestasi', req: false },
              ].map((item) => (
                <div key={item.id} className="border border-slate-100 p-4 rounded-xl hover:border-blue-200 transition-all bg-slate-50/50">
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-tight">
                    {item.label} {item.req && <span className="text-red-500">*</span>}
                  </label>
                  <input 
                    type="file" 
                    name={item.id} 
                    required={item.req} 
                    onChange={handleFileChange} 
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 text-blue-800">
              <FaInfoCircle className="text-xl shrink-0" />
              <p className="text-xs leading-relaxed">
                Dengan menekan tombol simpan, saya menyatakan bahwa data yang diinput adalah benar dan dapat dipertanggungjawabkan.
              </p>
            </div>
            <button type="submit" className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
              <FaSave /> Simpan Pendaftaran
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}