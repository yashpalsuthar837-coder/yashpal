import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Instagram, LogIn, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import LoginModal from './Auth/LoginModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();

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
          <div className="flex items-center gap-6 mr-4 pr-4 border-r border-white/10">
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com/in/yashpal-suthar" },
              { icon: Instagram, href: "https://instagram.com/yasxpal" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
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

          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="relative group">
                <img 
                  src={currentUser.photoURL || ''} 
                  alt="" 
                  className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:border-cyan-500/50 transition-all"
                />
                {isAdmin && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-black">
                    <ShieldCheck size={8} className="text-white" />
                  </div>
                )}
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 font-bold rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg shadow-white/5"
            >
              <LogIn size={18} />
              <span>Login</span>
            </motion.button>
          )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          {currentUser && (
            <Link to="/dashboard" className="relative group">
              <img 
                src={currentUser.photoURL || ''} 
                alt="" 
                className="w-8 h-8 rounded-lg object-cover border border-white/10"
              />
              {isAdmin && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-500 rounded-full flex items-center justify-center border border-black">
                  <ShieldCheck size={6} className="text-white" />
                </div>
              )}
            </Link>
          )}
          <button
            className="text-white p-2 glass rounded-xl border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
              {currentUser && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/10">
                    <img src={currentUser.photoURL || ''} alt="" className="w-12 h-12 rounded-xl" />
                    <div>
                      <p className="font-bold text-white">{currentUser.displayName}</p>
                      <p className="text-xs text-slate-400">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Link 
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 p-4 glass rounded-2xl border border-white/10 text-white font-bold"
                    >
                      <LayoutDashboard size={20} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}

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

              {!currentUser && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3"
                >
                  <LogIn size={20} />
                  <span>Login with Google</span>
                </button>
              )}
              
              <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://linkedin.com/in/yashpal-suthar" },
                  { icon: Instagram, href: "https://instagram.com/yasxpal" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
