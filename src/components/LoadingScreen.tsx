import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 10000; // 10 seconds
    const interval = 50; // Update every 50ms
    const stepSize = 100 / (totalDuration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepSize;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    const timers = [
      setTimeout(() => setStep(1), 2000), // Activate Sharingan
      setTimeout(() => setStep(2), 5000), // Genjutsu effect
      setTimeout(() => setStep(3), 8500), // Fade out
      setTimeout(() => onComplete(), 10000),
    ];

    return () => {
      clearInterval(timer);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ripple */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 4, opacity: [0, 0.2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-[500px] h-[500px] border-4 border-red-600 rounded-full"
          />
        )}
      </AnimatePresence>

      <div className="relative w-48 h-48 md:w-64 md:h-64">
        {/* Sharingan Eye */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full rounded-full relative overflow-hidden border-4 border-red-900/50"
          style={{ 
            background: 'radial-gradient(circle, #ff0000 0%, #4a0000 100%)',
            boxShadow: '0 0 100px rgba(255, 0, 0, 0.3)'
          }}
        >
          {/* Mangekyou Pattern */}
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            animate={{ 
              rotate: step >= 1 ? 1440 : 0,
              scale: step >= 2 ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 8, ease: "easeInOut" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <g transform="translate(50, 50)">
              {[0, 120, 240].map((angle) => (
                <motion.path
                  key={angle}
                  d="M 0,-5 C 15,-5 25,-25 25,-40 C 25,-25 15,-10 0,-10 Z"
                  fill="black"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="8" fill="black" />
              <circle cx="0" cy="0" r="25" fill="none" stroke="black" strokeWidth="1.5" opacity="0.3" />
            </g>
          </motion.svg>
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          animate={{ 
            opacity: step >= 1 ? [0.2, 0.5, 0.2] : 0,
            scale: step >= 1 ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-600 rounded-full blur-[60px] -z-10"
        />
      </div>

      {/* Progress & Percentage */}
      <div className="mt-16 w-64 flex flex-col items-center gap-4">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-red-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between w-full font-mono text-[10px] tracking-widest text-red-600/60 uppercase">
          <span>{step === 0 ? "Initializing" : step === 1 ? "Activating" : "Entering Genjutsu"}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-red-500 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </motion.div>
  );
}
