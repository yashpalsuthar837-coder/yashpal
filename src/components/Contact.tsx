import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, type FormEvent } from 'react';
import { Send, Mail, Github, Linkedin, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { db, collection, addDoc, handleFirestoreError, OperationType } from '../lib/firebase';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await addDoc(collection(db, 'messages'), {
        ...formState,
        createdAt: new Date().toISOString(),
      });
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Let's Build <br /> <span className="text-red-600">Something Great.</span></h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid sm:grid-cols-2 gap-6"
            >
              <a href="mailto:yashpalsuthar349@gmail.com" className="p-8 rounded-3xl glass border border-white/5 hover:border-red-600/30 transition-all group">
                <Mail className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Email</h3>
                <p className="font-bold truncate">yashpalsuthar349@gmail.com</p>
              </a>
              
              <a href="https://wa.me/919351830130" target="_blank" rel="noopener noreferrer" className="p-8 rounded-3xl glass border border-white/5 hover:border-red-600/30 transition-all group">
                <MessageCircle className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">WhatsApp</h3>
                <p className="font-bold">+91 93518 30130</p>
              </a>

              <a href="https://github.com/yashpalsuthar837-coder" target="_blank" rel="noopener noreferrer" className="p-8 rounded-3xl glass border border-white/5 hover:border-red-600/30 transition-all group">
                <Github className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">GitHub</h3>
                <p className="font-bold">yashpalsuthar837-coder</p>
              </a>

              <a href="https://linkedin.com/in/yashpal-suthar" target="_blank" rel="noopener noreferrer" className="p-8 rounded-3xl glass border border-white/5 hover:border-red-600/30 transition-all group">
                <Linkedin className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">LinkedIn</h3>
                <p className="font-bold">Yashpal suthar</p>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-12 rounded-[2.5rem] glass border border-white/10"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl glass border border-white/5 focus:border-red-600/50 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl glass border border-white/5 focus:border-red-600/50 focus:outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold ml-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl glass border border-white/5 focus:border-red-600/50 focus:outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-all ${
                  status === 'loading' ? 'bg-muted text-muted-foreground' : 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)]'
                }`}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <Send size={18} />
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-500 text-sm font-medium justify-center"
                  >
                    <CheckCircle2 size={16} /> Message sent successfully!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm font-medium justify-center"
                  >
                    <AlertCircle size={16} /> Something went wrong. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
