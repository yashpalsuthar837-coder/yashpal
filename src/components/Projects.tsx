import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useActivity } from '../hooks/useActivity';

const projects = [
  {
    title: "AI Life OS",
    description: "A comprehensive AI-powered operating system for managing daily life, tasks, and productivity with intelligent insights.",
    image: "https://picsum.photos/seed/ai-os/800/600",
    tags: ["React", "AI", "Tailwind"],
    demo: "#",
    github: "#"
  },
  {
    title: "Smart Student Dashboard",
    description: "An interactive dashboard designed for students to track assignments, grades, and schedules with AI-driven study plans.",
    image: "https://picsum.photos/seed/student/800/600",
    tags: ["Next.js", "Firebase", "Framer"],
    demo: "#",
    github: "#"
  },
  {
    title: "University Info Website",
    description: "A modern, high-performance information portal for universities with real-time updates and interactive campus maps.",
    image: "https://picsum.photos/seed/university/800/600",
    tags: ["React", "GSAP", "Three.js"],
    demo: "#",
    github: "#"
  },
  {
    title: "Productivity Web App",
    description: "A minimalist yet powerful productivity tool focused on deep work and flow state management with ambient soundscapes.",
    image: "https://picsum.photos/seed/productivity/800/600",
    tags: ["React", "Redux", "Node.js"],
    demo: "#",
    github: "#"
  },
  {
    title: "Digital Portfolio Template",
    description: "A premium, highly customizable portfolio template for creatives and developers looking for a futuristic aesthetic.",
    image: "https://picsum.photos/seed/portfolio/800/600",
    tags: ["React", "Tailwind", "Motion"],
    demo: "#",
    github: "#"
  },
  {
    title: "Society Help Platform",
    description: "A community-focused platform for local societies to manage resources, events, and mutual aid with real-time coordination.",
    image: "https://picsum.photos/seed/society/800/600",
    tags: ["React", "Supabase", "Maps"],
    demo: "#",
    github: "#"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { logActivity } = useActivity();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      className="group relative glass p-4 rounded-[2.5rem] border-white/5 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] transition-all duration-500 perspective-1000"
    >
      <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 preserve-3d">
        <motion.img
          src={project.image}
          alt={project.title}
          style={{
            x: useTransform(mouseXSpring, [-0.5, 0.5], [10, -10]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]),
            scale: 1.1,
          }}
          className="w-full h-full object-cover transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <a 
              href={project.demo} 
              onClick={() => logActivity('OPENED_PROJECT_DEMO', { project: project.title })}
              className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
            >
              <ExternalLink size={20} />
            </a>
            <a 
              href={project.github} 
              onClick={() => logActivity('OPENED_PROJECT_GITHUB', { project: project.title })}
              className="p-3 bg-white/20 text-white backdrop-blur-md rounded-full hover:scale-110 transition-transform"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">{project.title}</h3>
          <ArrowUpRight className="text-slate-500 group-hover:text-cyan-400 transition-colors" size={20} />
        </div>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/5 rounded-full border border-white/5 group-hover:border-white/10 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-cyan-400 font-medium tracking-widest uppercase mb-4 block"
            >
              Showcase
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
            >
              Premium <span className="text-gradient">Projects</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-md text-lg"
          >
            A collection of high-end digital experiences built with modern tech stacks and creative vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
