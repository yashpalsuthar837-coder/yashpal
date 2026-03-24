import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-48 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-3xl glass"
        >
          <img
            src="https://picsum.photos/seed/yashpal/800/1000"
            alt="Yashpal"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
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
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted leading-relaxed"
          >
            I'm a multidisciplinary designer and developer based in India. With a keen eye for detail and a passion for minimalist aesthetics, I bridge the gap between design and technology.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted leading-relaxed"
          >
            My approach is centered around creating meaningful digital experiences that are not only visually stunning but also highly functional and user-centric. Whether it's a brand identity or a complex web application, I strive for excellence in every pixel.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 pt-4"
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold">5+</span>
              <span className="text-xs text-muted uppercase tracking-widest">Years Experience</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10 mx-4" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold">50+</span>
              <span className="text-xs text-muted uppercase tracking-widest">Projects Completed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
