import { motion } from 'motion/react';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        document.body.style.overflow = 'auto';
      }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8 pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-6xl font-bold tracking-tighter"
      >
        YASHPAL
      </motion.div>
      <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-white"
        />
      </div>
    </motion.div>
  );
}
