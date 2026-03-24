import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Vibrant Digital',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/project1/800/600',
    description: 'A modern landing page for a creative agency with smooth scroll animations.',
    link: '#',
    github: '#',
  },
  {
    title: 'Luxe Brand Identity',
    category: 'Branding',
    image: 'https://picsum.photos/seed/project2/800/600',
    description: 'Minimalist brand identity design for a luxury fashion label.',
    link: '#',
    github: '#',
  },
  {
    title: 'Zen UI Kit',
    category: 'UI/UX Design',
    image: 'https://picsum.photos/seed/project3/800/600',
    description: 'A comprehensive UI kit for meditation and wellness apps.',
    link: '#',
    github: '#',
  },
  {
    title: 'Motion Graphics Showreel',
    category: 'Motion Graphics',
    image: 'https://picsum.photos/seed/project4/800/600',
    description: 'A collection of dynamic motion graphics and visual effects.',
    link: '#',
    github: '#',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-48 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Selected Works</h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            A collection of projects that showcase my design philosophy and technical capabilities.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-6"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  whileHover={{ scale: 1.05 }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
                  <motion.a
                    href={project.link}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-muted font-medium">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                <p className="text-muted leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
