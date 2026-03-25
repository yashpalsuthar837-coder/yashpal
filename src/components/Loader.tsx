import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-12 pointer-events-none"
    >
      <motion.div
        className="flex gap-1 md:gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {"YASHPAL".split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.8 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }
              },
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              }
            }}
            className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      <div className="relative w-72 md:w-96">
        {/* Naruto Character */}
        <motion.div
          className="absolute -top-16 left-0 z-10"
          style={{ x: `${progress}%`, translateX: '-50%' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-16 h-16">
            {/* Naruto SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Hair */}
              <path d="M30 30 L40 10 L50 25 L60 10 L70 30 L80 20 L75 45 L25 45 L20 20 Z" fill="#FFD700" />
              {/* Face */}
              <circle cx="50" cy="45" r="15" fill="#FFDBAC" />
              {/* Headband */}
              <rect x="35" y="38" width="30" height="8" fill="#1A1A1A" />
              <rect x="42" y="40" width="16" height="4" fill="#C0C0C0" />
              {/* Eyes */}
              <circle cx="45" cy="48" r="1.5" fill="black" />
              <circle cx="55" cy="48" r="1.5" fill="black" />
              {/* Whiskers */}
              <path d="M38 48 L32 46 M38 50 L32 50 M38 52 L32 54" stroke="black" strokeWidth="0.5" />
              <path d="M62 48 L68 46 M62 50 L68 50 M62 52 L68 54" stroke="black" strokeWidth="0.5" />
              {/* Mouth (Cat-like) */}
              <path d="M46 54 Q50 58 54 54" stroke="black" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <path d="M46 54 Q48 56 50 54" stroke="black" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <path d="M50 54 Q52 56 54 54" stroke="black" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>

        {/* Loading Bar */}
        <div className="h-1 w-full bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6321] via-[#FFD700] to-[#FF6321]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
          <span>Gathering Chakra...</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
