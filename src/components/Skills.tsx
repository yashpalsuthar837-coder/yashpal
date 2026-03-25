import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Layout, Server, Wrench, Code2, Palette, Database, Terminal, Globe, Cpu } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Layout className="text-red-600" size={24} />,
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 98 },
      { name: 'Framer Motion', level: 92 },
      { name: 'GSAP', level: 85 },
    ]
  },
  {
    title: 'Backend',
    icon: <Server className="text-red-600" size={24} />,
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'Firebase / Firestore', level: 95 },
      { name: 'PostgreSQL / MongoDB', level: 82 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'Authentication (OAuth)', level: 85 },
    ]
  },
  {
    title: 'Tools & Design',
    icon: <Wrench className="text-red-600" size={24} />,
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Docker', level: 75 },
      { name: 'Figma / UI Design', level: 92 },
      { name: 'Adobe Creative Suite', level: 90 },
      { name: 'Vercel / AWS', level: 85 },
    ]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Technical <br /> <span className="text-red-600">Arsenal.</span></h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A specialized toolkit focused on building scalable, high-performance applications with a focus on user experience.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-3 gap-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: catIndex * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl glass border border-white/5 flex flex-col gap-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight">{category.title}</h3>
              </div>

              <div className="flex flex-col gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="text-red-600">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: skill.level / 100 } : {}}
                        transition={{ duration: 1.5, delay: (catIndex * 0.2) + (skillIndex * 0.1), ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-red-600 origin-left"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
