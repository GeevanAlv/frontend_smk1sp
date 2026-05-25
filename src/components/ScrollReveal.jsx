import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, direction = 'up' }) {
  // Menentukan arah datangnya animasi
  const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      // Kondisi awal (sebelum di-scroll)
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction] 
      }}
      // Kondisi saat elemen masuk ke layar (viewport)
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      // Pengaturan viewport: once: true (animasi hanya 1x), amount: 0.2 (kelihatan 20% langsung animasi)
      viewport={{ once: false, amount: 0.2 }}
      // Pengaturan gaya animasi menggunakan fisika "spring" (ada efek memantul halus)
      transition={{
        duration: 0.8,
        delay: delay, // Waktu tunggu
        type: "spring",
        bounce: 0.3, // Efek pantulan
      }}
    >
      {children}
    </motion.div>
  );
}