import React from 'react';
import { motion } from 'motion/react';
import { Code2, Palette, Terminal, Cpu, BrainCircuit, Layout, Zap, Blocks, Sparkles } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: "HTML", icon: Code2, color: "text-orange-400", bg: "bg-orange-400/10" },
    { name: "CSS", icon: Palette, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "JavaScript", icon: Terminal, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { name: "React", icon: Blocks, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { name: "Tailwind CSS", icon: Layout, color: "text-teal-400", bg: "bg-teal-400/10" },
    { name: "AI Tools", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-400/10" },
    { name: "Prompt Engineering", icon: Sparkles, color: "text-pink-400", bg: "bg-pink-400/10" },
    { name: "UI/UX Ideas", icon: Palette, color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { name: "Creative Thinking", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-navy-950/50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-medium tracking-widest uppercase mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Futuristic <span className="text-gradient">Skillset</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            I combine technical expertise with creative problem-solving and AI-driven workflows to build modern digital products.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 10, 
                rotateY: 10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
              }}
              className="glass p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all group perspective-1000 preserve-3d"
            >
              <div className={`p-4 rounded-2xl ${skill.bg} w-fit mb-6 group-hover:scale-110 transition-transform ${skill.color}`}>
                <skill.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{skill.name}</h3>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                  className={`h-full bg-gradient-to-r from-blue-500 to-cyan-400`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
      </div>
    </section>
  );
};

export default Skills;
