import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center p-6"
        >
          <div className="max-w-md w-full text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl md:text-6xl font-display font-bold mb-12 tracking-tighter"
            >
              Yash<span className="text-gradient">pal</span>
            </motion.div>
            
            <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
              />
            </div>
            
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
              <span>Initializing System</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
          
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[180px] -z-10 rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
