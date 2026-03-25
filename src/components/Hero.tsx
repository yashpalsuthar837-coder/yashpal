import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [50, -50]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background Animation with Gyro Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/5 rounded-full blur-[150px] animate-pulse" 
        />
        <motion.div 
          style={{ x: useTransform(bgX, (v) => v * -1.5), y: useTransform(bgY, (v) => v * -1.5) }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-[100px] animate-bounce duration-[15s]" 
        />
        <motion.div 
          style={{ x: useTransform(bgX, (v) => v * 2), y: useTransform(bgY, (v) => v * 2) }}
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-foreground/5 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div
        style={{ 
          y, 
          opacity, 
          scale,
          rotateX,
          rotateY,
          perspective: 1000
        }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base font-medium text-muted-foreground mb-6 tracking-[0.4em] uppercase"
        >
          Hello, I'm Yashpal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 text-gradient"
        >
          YASHPAL
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Graphics Designer & Web Developer crafting premium digital experiences with precision and passion.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll to explore</span>
        <motion.div 
          animate={{ height: [0, 48, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-foreground/50" 
        />
      </motion.div>
    </section>
  );
}
