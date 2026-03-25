import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const skills = [
  { name: 'Graphics Design', level: 95 },
  { name: 'Web Development', level: 90 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Motion Graphics', level: 80 },
  { name: 'Branding', level: 90 },
  { name: 'Frontend Development', level: 95 },
];

const technologies = [
  'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'After Effects'
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-48 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Expertise</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A diverse set of skills ranging from visual design to technical implementation.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div className="flex flex-col gap-10">
            {skills.map((skill, index) => (
              <div key={skill.name} className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-medium uppercase tracking-widest">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: skill.level / 100 } : {}}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-white origin-left"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 content-start">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="px-6 py-3 rounded-full glass text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
