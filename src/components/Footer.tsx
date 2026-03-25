import { motion } from 'motion/react';
import { Github, Linkedin, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col gap-2"
        >
          <span className="text-2xl font-bold tracking-tighter">Yashpal<span className="text-red-600">.</span></span>
          <p className="text-sm text-muted-foreground">© {currentYear} Yashpal. All rights reserved.</p>
        </motion.div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/yashpalsuthar837-coder" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-600 transition-colors">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/yashpal-suthar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-600 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://wa.me/919351830130" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-600 transition-colors">
            <MessageCircle size={20} />
          </a>
          <a href="mailto:yashpalsuthar349@gmail.com" className="text-muted-foreground hover:text-red-600 transition-colors">
            <Mail size={20} />
          </a>
        </div>

        <div className="text-sm text-muted-foreground font-medium">
          Designed & Built with <span className="text-red-600">❤️</span> by Yashpal
        </div>
      </div>
    </footer>
  );
}
