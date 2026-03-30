import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, Twitter, ArrowUp } from 'lucide-react';
import { useActivity } from '../hooks/useActivity';

const Footer = () => {
  const { logActivity } = useActivity();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSocialClick = (platform: string) => {
    logActivity('SOCIAL_LINK_CLICKED', { platform });
  };

  return (
    <footer className="py-16 relative overflow-hidden border-t border-white/5 bg-navy-950/50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold mb-4 tracking-tighter"
            >
              Yash<span className="text-gradient">pal</span>
            </motion.div>
            <p className="text-slate-500 max-w-xs leading-relaxed">
              Building the future of digital experiences with technology and creative vision.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12">
            {[
              { label: "Home", href: "#home" },
              { label: "About", href: "#about" },
              { label: "Skills", href: "#skills" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" }
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                whileHover={{ y: -5, color: "#3b82f6" }}
                className="text-sm font-bold uppercase tracking-widest text-slate-400 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: "https://github.com", label: "Github" },
              { icon: Linkedin, href: "https://linkedin.com/in/yashpal-suthar", label: "Linkedin" },
              { icon: Instagram, href: "https://instagram.com/yasxpal", label: "Instagram" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick(social.label)}
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 rounded-xl glass border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-slate-400 hover:text-cyan-400"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
          <p className="text-slate-600 text-sm font-medium">
            © 2026 Yashpal. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 rounded-2xl glass border-white/10 text-cyan-400 hover:bg-white/10 transition-all shadow-2xl shadow-blue-500/10"
          >
            <ArrowUp size={24} />
          </motion.button>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[150px] -z-10 rounded-full" />
    </footer>
  );
};

export default Footer;
