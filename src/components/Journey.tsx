import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Code, Sparkles, Layout, Globe, Cpu } from 'lucide-react';

const Journey = () => {
  const steps = [
    {
      year: "2023",
      title: "The Spark",
      description: "Started exploring technology and passed 10th grade with a growing curiosity for the digital world.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-400"
    },
    {
      year: "2024",
      title: "Foundations",
      description: "Deep-dived into web development, learning HTML, CSS, and JavaScript to build my first interactive projects.",
      icon: Code,
      color: "from-cyan-400 to-teal-400"
    },
    {
      year: "2025",
      title: "Expansion",
      description: "Passed 12th grade and started using AI creatively to enhance my development workflow and build smarter tools.",
      icon: Sparkles,
      color: "from-teal-400 to-purple-400"
    },
    {
      year: "2026",
      title: "Innovation",
      description: "Building personal and practical projects while exploring startup ideas and the future of digital products.",
      icon: Cpu,
      color: "from-purple-400 to-pink-400"
    }
  ];

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-navy-950/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-medium tracking-widest uppercase mb-4 block"
          >
            Timeline
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            My <span className="text-gradient">Journey</span>
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-400/50 to-purple-400/50 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${step.color} text-white mb-4`}>
                    {step.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed max-w-md mx-auto md:mx-0">
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 text-white shadow-2xl shadow-blue-500/20 flex items-center justify-center`}
                  >
                    <step.icon size={32} />
                  </motion.div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[150px] -z-10 rounded-full" />
    </section>
  );
};

export default Journey;
