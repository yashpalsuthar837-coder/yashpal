import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 4000; // 4 seconds for a smooth journey
    const interval = 30;
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

    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalDuration + 800);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden font-mono"
    >
      <div className="relative w-full max-w-4xl px-12 flex flex-col items-center justify-center">
        {/* Journey Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            DEPARTING FOR SUCCESS
          </h2>
          <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">Destination: Yashpal's Portfolio</p>
        </motion.div>

        {/* Railway Track Container */}
        <div className="relative w-full h-24 flex items-end">
          {/* The Track */}
          <div className="absolute bottom-0 left-0 w-full h-4 flex flex-col justify-between">
            {/* Rails */}
            <div className="w-full h-[2px] bg-muted-foreground/20" />
            <div className="w-full h-[2px] bg-muted-foreground/20" />
            
            {/* Sleepers (Wooden planks) */}
            <div className="absolute inset-0 flex justify-between px-2">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-[2px] h-full bg-muted-foreground/10" />
              ))}
            </div>
          </div>

          {/* Finish Flag */}
          <motion.div 
            className="absolute bottom-4 right-0 z-20"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-4xl">🏁</span>
          </motion.div>

          {/* The Train */}
          <motion.div
            className="absolute bottom-2 z-10"
            style={{ left: `${progress}%`, translateX: '-100%' }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <div className="relative flex flex-col items-center">
              {/* Steam Particles */}
              <div className="absolute -top-8 left-4 flex flex-col-reverse gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [1, 2], 
                      opacity: [0.4, 0],
                      y: [-10, -40],
                      x: [0, 10]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                    className="w-3 h-3 bg-muted-foreground/20 rounded-full blur-[2px]"
                  />
                ))}
              </div>

              {/* Train Engine SVG */}
              <div className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                  <path d="M4,15V9H12V7H20V15H4M20,15V17H22V15H20M4,15V17H2V15H4M12,17A2,2 0 0,1 10,19A2,2 0 0,1 8,17A2,2 0 0,1 10,15A2,2 0 0,1 12,17M18,17A2,2 0 0,1 16,19A2,2 0 0,1 14,17A2,2 0 0,1 16,15A2,2 0 0,1 18,17Z" />
                </svg>
              </div>

              {/* Movement Vibration */}
              <motion.div
                animate={{ y: [0, -1, 0] }}
                transition={{ duration: 0.1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Progress Info */}
        <div className="mt-24 flex flex-col items-center gap-8 w-full max-w-md">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-bold">
              {progress < 100 ? "Traveling to Destination..." : "Arrival at Platform 1"}
            </span>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-muted-foreground/20" />
              <span className="text-2xl font-bold tracking-tighter text-foreground">{Math.round(progress)}%</span>
              <div className="h-[1px] w-12 bg-muted-foreground/20" />
            </div>
          </div>

          {/* Subtle Progress Bar */}
          <div className="w-full h-[2px] bg-muted-foreground/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)]" />
      </div>
    </motion.div>
  );
}
