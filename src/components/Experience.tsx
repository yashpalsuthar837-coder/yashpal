import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Code2 } from 'lucide-react';

const experiences = [
  {
    year: '2025 - Present',
    role: 'Freelance Web Developer',
    company: 'Self-Employed | BCA Student',
    description: 'Building high-performance web applications with a focus on user experience and modern tech stacks. Exploring AI integration and serverless architectures.',
    icon: <Code2 size={24} />,
  },
  {
    year: '2023 - 2025',
    role: 'Full-Stack Explorer',
    company: 'Higher Secondary Schooling',
    description: 'Mastered the fundamentals of web development and UI/UX design. Built several personal projects and contributed to open-source communities.',
    icon: <GraduationCap size={24} />,
  },
  {
    year: '2021 - 2023',
    role: 'Tech Enthusiast',
    company: 'Secondary Schooling',
    description: 'Started the journey into the tech world. Learned basic programming, logic building, and explored various digital creative tools.',
    icon: <Briefcase size={24} />,
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Professional <br /> <span className="text-red-600">Journey.</span></h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A timeline of my growth as a developer, from early exploration to building production-ready solutions.
          </p>
        </motion.div>

        <div ref={ref} className="relative space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center"
            >
              {/* Left Side (Desktop) */}
              <div className={`hidden md:block ${index % 2 === 0 ? 'text-right' : 'opacity-0 pointer-events-none'}`}>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-red-600/60 mb-2 block">{exp.year}</span>
                <h3 className="text-2xl font-bold tracking-tight mb-2">{exp.role}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md ml-auto">{exp.description}</p>
              </div>

              {/* Center Icon */}
              <div className="relative flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(220,38,38,0.1)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] z-10">
                  {exp.icon}
                </div>
                {index !== experiences.length - 1 && (
                  <div className="absolute top-14 bottom-[-3rem] w-[1px] bg-gradient-to-b from-red-600/50 to-transparent hidden md:block" />
                )}
              </div>

              {/* Right Side (Desktop) / Content (Mobile) */}
              <div className={`flex flex-col gap-2 ${index % 2 !== 0 ? 'text-left' : 'md:opacity-0 md:pointer-events-none'}`}>
                <div className="md:hidden">
                  <span className="text-sm font-bold uppercase tracking-[0.3em] text-red-600/60 mb-2 block">{exp.year}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-1">{exp.role}</h3>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3 block">{exp.company}</span>
                <div className="md:hidden">
                  <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                </div>
                <div className={`hidden md:block ${index % 2 !== 0 ? '' : 'hidden'}`}>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
