import React from 'react';
import { motion } from 'motion/react';
import { Globe, BrainCircuit, Layout, GraduationCap, Palette, Lightbulb } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Portfolio Websites",
      description: "Custom, high-end personal brand websites that showcase your work with a premium, futuristic feel.",
      icon: Globe,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      title: "AI-Based Web Ideas",
      description: "Integrating intelligent features and AI tools into web applications to create smarter user experiences.",
      icon: BrainCircuit,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },
    {
      title: "Landing Pages",
      description: "High-conversion, visually stunning landing pages for startups and digital products with modern animations.",
      icon: Layout,
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    },
    {
      title: "Student Projects",
      description: "Helping students build practical, impressive web projects for their academic and personal growth.",
      icon: GraduationCap,
      color: "text-teal-400",
      bg: "bg-teal-400/10"
    },
    {
      title: "UI Concepts",
      description: "Designing futuristic, layered, and interactive UI concepts that push the boundaries of modern design.",
      icon: Palette,
      color: "text-pink-400",
      bg: "bg-pink-400/10"
    },
    {
      title: "Digital Product Ideas",
      description: "Brainstorming and prototyping innovative digital products that solve real-world problems with technology.",
      icon: Lightbulb,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10"
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-medium tracking-widest uppercase mb-4 block"
          >
            What I Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Premium <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            I offer a range of creative and technical services to help you build the future of the digital world.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all group"
            >
              <div className={`p-5 rounded-2xl ${service.bg} w-fit mb-8 group-hover:scale-110 transition-transform ${service.color}`}>
                <service.icon size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
