import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/yasxpal' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Github, href: '#' },
];

export default function Footer() {
  return (
    <footer className="py-12 md:py-24 px-6 md:px-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-tighter">YASHPAL</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Crafting premium digital experiences with precision and passion.
          </p>
        </div>

        <div className="flex gap-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-center md:text-right">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">© 2026 Yashpal Suthar</span>
          <span className="text-xs text-muted-foreground/50">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
