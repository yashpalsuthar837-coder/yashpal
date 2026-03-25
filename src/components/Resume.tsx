import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Download, FileText, CheckCircle2, Star } from 'lucide-react';
import { playSound } from '../lib/sounds';

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDownload = () => {
    playSound('click');
    // In a real app, this would link to the actual PDF file
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section id="resume" className="py-24 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          {/* Background Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative glass p-8 md:p-16 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 text-red-600 text-xs font-bold uppercase tracking-widest">
                <Star size={14} /> Available for Internships
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Ready to make an <br /> <span className="text-red-600">Impact.</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I've spent the last few years honing my skills in full-stack development and UI/UX design. 
                My resume provides a detailed look at my technical background, academic achievements, and the problems I've solved.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  'Full-Stack Ready',
                  'UI/UX Focused',
                  'Problem Solver',
                  'Fast Learner'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CheckCircle2 size={16} className="text-red-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                onMouseEnter={() => playSound('hover')}
                className="group relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-red-600 flex flex-col items-center justify-center gap-4 text-white shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:shadow-[0_0_70px_rgba(220,38,38,0.5)] transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500" />
                <Download size={48} className="group-hover:-translate-y-2 transition-transform duration-500" />
                <span className="font-bold uppercase tracking-[0.2em] text-xs">Download CV</span>
                <span className="text-[10px] opacity-50 uppercase tracking-widest">PDF | 1.2MB</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
