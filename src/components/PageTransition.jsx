import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      // Kondisi awal saat halaman baru mau masuk
      initial={{ opacity: 0, y: 15 }}
      // Kondisi saat halaman sudah masuk sepenuhnya
      animate={{ opacity: 1, y: 0 }}
      // Kondisi saat halaman ini mau ditinggalkan/ditutup
      exit={{ opacity: 0, y: -15 }}
      // Kecepatan transisi
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}