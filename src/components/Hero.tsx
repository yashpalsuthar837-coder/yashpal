import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Instagram, Download, User as UserIcon } from 'lucide-react';
import { useActivity } from '../hooks/useActivity';
import { useAuth } from '../contexts/AuthContext';

const Hero = () => {
  const { logActivity } = useActivity();
  const { currentUser } = useAuth();
  
  const handleResumeDownload = () => {
    logActivity('RESUME_DOWNLOAD_CLICKED');
    // In a real app, this would trigger the download
    window.open('/resume.pdf', '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-cyan-400 uppercase glass rounded-full border-cyan-500/20"
          >
            Welcome to the Future
          </motion.span>

          {currentUser && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-8 glass p-2 pr-6 rounded-full border-white/10 w-fit mx-auto"
            >
              <img 
                src={currentUser.photoURL || ''} 
                alt="" 
                className="w-10 h-10 rounded-full border border-white/20"
              />
              <div className="text-left">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest leading-none mb-1">Logged in as</p>
                <p className="text-sm font-bold text-white leading-none">{currentUser.displayName}</p>
              </div>
            </motion.div>
          )}
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight tracking-tighter"
          >
            <span className="block">Building the Future</span>
            <span className="text-gradient">with Technology</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            I create modern digital experiences, explore AI tools, and build creative web projects with futuristic ideas.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
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
            <motion.button
              onClick={handleResumeDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Resume <Download size={18} />
            </motion.button>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/yashpal-suthar", label: "LinkedIn" },
              { icon: Instagram, href: "https://instagram.com/yasxpal", label: "Instagram" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: "#3b82f6" }}
                className="text-slate-500 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" />
    </section>
  );
};

export default Hero;
