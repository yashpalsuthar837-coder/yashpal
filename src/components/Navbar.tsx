import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Instagram } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass border-b border-white/10' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter"
        >
          Yash<span className="text-gradient">pal</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2, color: "#3b82f6" }}
              className="text-sm font-bold uppercase tracking-widest text-slate-400 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {[
            { icon: Github, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Instagram, href: "#" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5, color: "#3b82f6" }}
              className="text-slate-400 transition-colors"
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2 glass rounded-xl border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                {[
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Instagram, href: "#" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, color: "#3b82f6" }}
                    className="text-slate-400 transition-colors"
                  >
                    <social.icon size={28} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
