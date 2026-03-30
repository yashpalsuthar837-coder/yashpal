import React from 'react';
import { motion } from 'motion/react';
import { MapPin, GraduationCap, Code, Cpu, Sparkles } from 'lucide-react';

const About = () => {
  const infoCards = [
    {
      icon: MapPin,
      title: "Location",
      description: "Rajasthan, India",
      color: "text-blue-400"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Passed 10th in 2023 • Passed 12th in 2025",
      color: "text-cyan-400"
    },
    {
      icon: Code,
      title: "Interests",
      description: "Technology • Web Development • AI Tools",
      color: "text-purple-400"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-cyan-400 font-medium tracking-widest uppercase mb-4 block">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              I'm <span className="text-gradient">Yashpal</span>, a Tech Explorer and Digital Creator.
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              I'm deeply passionate about the intersection of design and technology. My journey in the tech world started with a curiosity about how things work on the internet, which quickly evolved into a dedicated pursuit of building creative web projects and exploring the vast potential of AI tools.
            </p>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Based in Rajasthan, India, I'm constantly learning and experimenting with new technologies to build modern digital experiences that feel immersive and futuristic.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {infoCards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-2xl border-white/5 hover:border-white/20 transition-all group"
                >
                  <div className={`p-3 rounded-xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform ${card.color}`}>
                    <card.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden glass p-2 border-white/10 group">
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <img
                  src="https://picsum.photos/seed/yashpal/800/800"
                  alt="Yashpal"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl border-white/20 shadow-2xl"
              >
                <Sparkles className="text-cyan-400 mb-1" size={20} />
                <span className="text-xs font-bold uppercase tracking-tighter">AI Enthusiast</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl border-white/20 shadow-2xl"
              >
                <Cpu className="text-blue-400 mb-1" size={20} />
                <span className="text-xs font-bold uppercase tracking-tighter">Tech Builder</span>
              </motion.div>
            </div>
            
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/20 blur-[120px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
