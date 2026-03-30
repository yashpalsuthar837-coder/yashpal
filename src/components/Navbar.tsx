import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Eclipse, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import { playSound } from '../lib/sounds';
import Login from './Login';

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
  const { isMuted, toggleMute } = useSound();
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
        <div className="hidden md:flex gap-4 items-center">
          <div className="flex gap-2 p-1.5 rounded-full liquid-glass">
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
                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                    location.pathname === link.href 
                      ? "bg-foreground text-background shadow-lg" 
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="flex gap-2 ml-2">
            {/* Sound Toggle Button */}
            <motion.button
              onClick={() => {
                playSound('click');
                triggerHaptic();
                toggleMute();
              }}
              onMouseEnter={handleHover}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-10 h-10 flex items-center justify-center rounded-full liquid-glass"
              title={isMuted ? "Unmute Sounds" : "Mute Sounds"}
            >
            <AnimatePresence mode="wait">
              {isMuted ? (
                <motion.div
                  key="muted"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <VolumeX size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="unmuted"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Volume2 size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={handleCycleTheme}
            onMouseEnter={handleHover}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-10 h-10 flex items-center justify-center rounded-full liquid-glass"
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

          <Login />
        </div>
      </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            onClick={() => {
              playSound('click');
              triggerHaptic();
              toggleMute();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full liquid-glass"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>
          <motion.button
            onClick={handleCycleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full liquid-glass"
          >
            {theme === 'light' ? <Sun size={18} /> : theme === 'dark' ? <Moon size={18} /> : <Eclipse size={18} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "text-foreground w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 liquid-glass shadow-xl",
              isOpen ? "bg-foreground text-background" : "bg-background/40"
            )}
            onClick={() => {
              playSound('click');
              triggerHaptic();
              setIsOpen(!isOpen);
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden bg-background/60 backdrop-blur-sm"
            style={{ transform: 'translateZ(0)' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-[92%] max-w-sm p-6 liquid-glass flex flex-col gap-6 shadow-2xl relative overflow-hidden border-white/30"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Internal Close Button - More Prominent */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  playSound('click');
                  triggerHaptic();
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300 z-50"
              >
                <X size={24} />
              </motion.button>

              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.03 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "text-4xl font-black tracking-tighter py-3 px-2 block transition-all duration-300 rounded-2xl active:bg-foreground/5",
                        location.pathname === link.href ? "text-foreground" : "text-muted-foreground"
                      )}
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4">
                <Login />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
