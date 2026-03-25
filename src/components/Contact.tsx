import { motion, useInView } from 'motion/react';
import { useRef, useState, type FormEvent } from 'react';
import { Send, Mail, MapPin, Phone, Instagram } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
    alert('Thank you for your message! I will get back to you soon.');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 md:py-48 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Get in Touch</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              <a href="mailto:yashpalsuthar349@gmail.com" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Email</span>
                  <span className="text-xl font-bold tracking-tight">yashpalsuthar349@gmail.com</span>
                </div>
              </a>
              <a href="tel:9351830130" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Phone</span>
                  <span className="text-xl font-bold tracking-tight">9351830130</span>
                </div>
              </a>
              <a href="https://instagram.com/yasxpal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Instagram size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Instagram</span>
                  <span className="text-xl font-bold tracking-tight">@yasxpal</span>
                </div>
              </a>
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">Location</span>
                  <span className="text-xl font-bold tracking-tight">Rajasthan, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground font-medium ml-1">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-medium ml-1">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                placeholder="Your Email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground font-medium ml-1">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                placeholder="Your Message"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-2xl bg-white text-black font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-white/90 transition-all duration-300"
            >
              Send Message <Send size={18} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
