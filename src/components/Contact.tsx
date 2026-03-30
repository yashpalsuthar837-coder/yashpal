import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Github, Linkedin, Instagram, MapPin, Phone, Loader2 } from 'lucide-react';
import { useActivity } from '../hooks/useActivity';
import { toast } from 'sonner';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Contact = () => {
  const { logActivity } = useActivity();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Log to activity_logs
      await logActivity('CONTACT_FORM_SUBMITTED', { 
        name: formState.name, 
        email: formState.email 
      });

      // Save to a dedicated contacts collection
      await addDoc(collection(db, 'contact_submissions'), {
        ...formState,
        timestamp: serverTimestamp(),
        status: 'new'
      });

      toast.success('Message sent successfully! I will get back to you soon.');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-cyan-400 font-medium tracking-widest uppercase mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Let's <span className="text-gradient">Connect</span> and Build Something Amazing.
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-8 mb-12">
              {[
                { icon: Mail, label: "Email", value: "yashpalsuthar349@gmail.com", href: "mailto:yashpalsuthar349@gmail.com" },
                { icon: MapPin, label: "Location", value: "Rajasthan, India", href: "#" },
                { icon: Phone, label: "Phone", value: "+91 9351830130", href: "tel:+919351830130" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="p-4 rounded-2xl glass border-white/5 group-hover:border-white/20 group-hover:bg-white/10 transition-all text-cyan-400">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                    <p className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/yashpal-suthar", label: "LinkedIn" },
                { icon: Instagram, href: "https://instagram.com/yasxpal", label: "Instagram" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="p-4 rounded-2xl glass border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-slate-400 hover:text-cyan-400"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="glass p-10 rounded-[3rem] border-white/10 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Your Message"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600 resize-none"
                    required
                  />
                </div>
                <motion.button
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 glow-blue transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>Sending... <Loader2 className="animate-spin" size={20} /></>
                  ) : (
                    <>Send Message <Send size={20} /></>
                  )}
                </motion.button>
              </form>
              
              {/* Background decorative glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
