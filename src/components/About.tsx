import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Cpu } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);

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

  return (
    <section id="about" className="relative py-24 md:py-48 px-6 md:px-12 bg-background overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <motion.div 
          style={{ x: useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]), y: useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]) }}
          className="absolute top-20 left-10 w-64 h-64 bg-[#FF6321] rounded-full blur-[100px]" 
        />
        <motion.div 
          style={{ x: useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]), y: useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]) }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD700] rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            style={{ rotateX, rotateY, perspective: 1000 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl glass group"
          >
            <img
              src="https://picsum.photos/seed/yashpal/800/1000"
              alt="Yashpal"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Floating Tech Icon */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 w-12 h-12 rounded-2xl glass flex items-center justify-center text-[#FF6321] shadow-xl"
            >
              <Cpu size={24} />
            </motion.div>
          </motion.div>

        <div className="flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            I am Yashpal, a passionate and motivated individual from Sahuwala, Rajasthan, born on 14 February 2007. I completed my secondary education in 2023 and higher secondary education in 2025. I have a keen interest in the field of technology and continuously explore new advancements in digital tools and systems.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            I am driven by curiosity and a desire to learn, which helps me adapt to new challenges and opportunities. I enjoy working on tech-related ideas and improving my skills step by step. My goal is to build a strong career in the technology field and contribute to meaningful innovations that can benefit society.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed italic"
          >
            "I consider myself disciplined, focused, and committed to personal and professional growth."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 pt-8 border-t border-foreground/10"
          >
            <div className="flex flex-col group">
              <span className="text-4xl font-bold group-hover:text-[#FF6321] transition-colors">2+</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Years Experience</span>
            </div>
            <div className="w-[1px] h-12 bg-foreground/10 mx-6" />
            <div className="flex flex-col group">
              <span className="text-4xl font-bold group-hover:text-[#FFD700] transition-colors">20+</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Projects Completed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
