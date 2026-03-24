import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "py-4 px-6 md:px-12 bg-black/80 backdrop-blur-md border-b border-white/10" 
          : "py-8 px-6 md:px-12 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className={cn(
              "text-xl font-bold tracking-tighter transition-all duration-300",
              isScrolled ? "text-white" : "text-white"
            )}
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
            >
              <Link
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  location.pathname === link.href ? "text-white" : "text-muted hover:text-white"
                )}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-full glass text-sm font-medium"
          >
            Let's Talk
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            isScrolled ? "glass" : "bg-transparent"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden",
          !isOpen && "pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.1 }}
          >
            <Link
              to={link.href}
              className="text-3xl font-bold tracking-tighter"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  );
}
