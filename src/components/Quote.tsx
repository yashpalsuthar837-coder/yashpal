import React from 'react';
import { motion } from 'motion/react';
import { Quote as QuoteIcon } from 'lucide-react';

const Quote = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-navy-950/50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-blue-500/20">
              <QuoteIcon size={120} />
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tighter mb-12 relative z-10">
              "Great ideas become <span className="text-gradient">powerful</span> when technology gives them <span className="text-gradient">life</span>."
            </h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-8"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-xl text-slate-400 font-medium uppercase tracking-[0.2em]"
            >
              Yashpal • 2026
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[180px] -z-10 rounded-full" />
    </section>
  );
};

export default Quote;
