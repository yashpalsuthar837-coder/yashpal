import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const experiences = [
  {
    year: '2025 - Present',
    role: 'Freelance Web Developer',
    company: 'Self-Employed | BCA Student',
    description: 'Working on independent projects, building responsive web applications, and exploring AI-driven solutions.',
  },
  {
    year: '2023 - 2025',
    role: 'Self-taught Designer & Developer',
    company: 'Higher Secondary Schooling',
    description: 'Developed a strong foundation in digital design tools and front-end development while completing higher secondary education.',
  },
  {
    year: '2021 - 2023',
    role: 'Tech Explorer',
    company: 'Secondary Schooling',
    description: 'Started exploring the world of technology, learning basic programming concepts and digital art fundamentals.',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-48 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Experience</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional career and the roles that shaped my expertise.
          </p>
        </motion.div>

        <div ref={ref} className="relative flex flex-col gap-12 md:gap-24">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-white -translate-x-1/2 z-10 hidden md:block" />

              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-24' : 'md:pr-24'} flex flex-col gap-4`}>
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{exp.year}</span>
                <h3 className="text-3xl font-bold tracking-tight">{exp.role}</h3>
                <span className="text-lg font-medium text-foreground/80">{exp.company}</span>
                <p className="text-muted-foreground leading-relaxed max-w-lg">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
