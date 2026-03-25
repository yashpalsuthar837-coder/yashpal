import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Eclipse } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useTheme } from '../context/ThemeContext';
import { playSound } from '../lib/sounds';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Resume', href: '/#resume' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, cycleTheme } = useTheme();
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const triggerHaptic = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleCycleTheme = () => {
    playSound('click');
    triggerHaptic();
    cycleTheme();
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    playSound('click');
    triggerHaptic();
    setIsOpen(false);

    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element && location.pathname === '/') {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHover = () => {
    playSound('hover');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "py-4 px-6 md:px-12 bg-background/80 backdrop-blur-md border-b border-border" 
          : "py-8 px-6 md:px-12 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={handleHover}
        >
          <Link 
            to="/" 
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-xl font-bold tracking-tighter transition-all duration-300"
          >
            YASHPAL
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onMouseEnter={handleHover}
            >
              <Link
                to={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          {/* Theme Toggle Button */}
          <motion.button
            onClick={handleCycleTheme}
            onMouseEnter={handleHover}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-10 h-10 flex items-center justify-center rounded-full glass"
            title={`Switch to ${theme === 'light' ? 'Dark' : theme === 'dark' ? 'Extra Dark' : 'Light'} Mode`}
          >
            <AnimatePresence mode="wait">
              {theme === 'light' && (
                <motion.div
                  key="light"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <Sun size={20} />
                </motion.div>
              )}
              {theme === 'dark' && (
                <motion.div
                  key="dark"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <Moon size={20} />
                </motion.div>
              )}
              {theme === 'extra-dark' && (
                <motion.div
                  key="extra-dark"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <Eclipse size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={handleHover}
            onClick={() => {
              playSound('click');
              triggerHaptic();
            }}
            className="px-5 py-2 rounded-full glass text-sm font-medium"
          >
            Let's Talk
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <motion.button
            onClick={handleCycleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full glass"
          >
            {theme === 'light' ? <Sun size={18} /> : theme === 'dark' ? <Moon size={18} /> : <Eclipse size={18} />}
          </motion.button>
          <button
            className={cn(
              "text-foreground w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
              isScrolled ? "glass" : "bg-transparent"
            )}
            onClick={() => {
              playSound('click');
              triggerHaptic();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden",
          "bg-background/90 backdrop-blur-2xl",
          !isOpen && "pointer-events-none"
        )}
      >
        {/* Prominent Close Button inside Overlay */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => {
            playSound('click');
            triggerHaptic();
            setIsOpen(false);
          }}
          className="absolute top-8 right-8 w-14 h-14 rounded-full glass flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          <X size={32} />
        </motion.button>

        {navLinks.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            onMouseEnter={handleHover}
          >
            <Link
              to={link.href}
              className="text-4xl font-bold tracking-tighter"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  );
}
