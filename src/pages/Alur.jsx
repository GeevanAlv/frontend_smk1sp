import { FaCalendarAlt, FaFileSignature, FaUserCheck, FaBullhorn, FaRegCheckCircle, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Alur() {
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
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-center">
        <h2 className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">Informasi Resmi</h2>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Jadwal & Persyaratan SPMB</h1>
        <p className="text-slate-500 text-lg">Tahun Pelajaran 2026/2027 SMKN 1 Simpang Pematang</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Kolom Kiri: Jadwal (Table Style) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <FaCalendarAlt />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Jadwal Pelaksanaan</h3>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Kegiatan</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {jadwal.map((item, i) => (
                  <tr key={i} className="hover:bg-white transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-800 text-sm">{item.event}</p>
                      <p className="text-xs text-blue-600 font-medium flex items-center gap-1 mt-1">
                        <FaClock /> {item.time}
                      </p>
                    </td>
                    <td className="p-4 text-sm font-bold text-slate-700">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kolom Kanan: Persyaratan (Checklist Style) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white shadow-lg">
              <FaFileSignature />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Persyaratan Berkas</h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-3">
              {persyaratan.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <FaRegCheckCircle className="text-blue-600 mt-1 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 py-12 text-center">
        <h3 className="text-white font-bold text-xl mb-6">Siap Bergabung Bersama Kami?</h3>
        <Link to="/register" className="inline-block bg-blue-600 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}