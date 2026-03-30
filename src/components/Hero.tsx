import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Instagram } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-cyan-400 uppercase glass rounded-full border-cyan-500/20">
              Welcome to the Future
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight tracking-tighter">
              <span className="block">Building the Future</span>
              <span className="text-gradient">with Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              I create modern digital experiences, explore AI tools, and build creative web projects with futuristic ideas.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold flex items-center gap-2 glow-blue transition-all"
              >
                View Projects <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass text-white rounded-full font-semibold border-white/10 hover:bg-white/10 transition-all"
              >
                Contact Me
              </motion.a>
            </div>

            <div className="flex items-center justify-center gap-6">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Instagram, href: "#", label: "Instagram" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, color: "#3b82f6" }}
                  className="text-slate-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" />
    </section>
  );
};

export default Hero;
