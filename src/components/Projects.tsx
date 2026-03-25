import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, X, Info, Code, User, Calendar, Filter } from 'lucide-react';
import { playSound } from '../lib/sounds';
import { db, collection, onSnapshot, query, orderBy, OperationType, handleFirestoreError } from '../lib/firebase';

const localProjects = [
  {
    title: 'Vibrant Digital',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/project1/800/600',
    description: 'A modern landing page for a creative agency with smooth scroll animations.',
    longDescription: 'Vibrant Digital is a high-performance landing page designed to showcase the creative prowess of a digital agency. It features complex GSAP animations, a custom cursor, and a highly responsive layout that adapts perfectly to all screen sizes.',
    technologies: ['React', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
    role: 'Lead Developer',
    date: 'Jan 2024',
    link: '#',
    github: '#',
  },
  {
    title: 'Luxe Brand Identity',
    category: 'Branding',
    image: 'https://picsum.photos/seed/project2/800/600',
    description: 'Minimalist brand identity design for a luxury fashion label.',
    longDescription: 'This project involved creating a complete brand identity for "Luxe", a high-end fashion label. The goal was to convey elegance and exclusivity through minimalist design, a sophisticated color palette, and bespoke typography.',
    technologies: ['Adobe Illustrator', 'Photoshop', 'Figma'],
    role: 'Brand Designer',
    date: 'Nov 2023',
    link: '#',
    github: '#',
  },
  {
    title: 'Zen UI Kit',
    category: 'UI/UX Design',
    image: 'https://picsum.photos/seed/project3/800/600',
    description: 'A comprehensive UI kit for meditation and wellness apps.',
    longDescription: 'Zen UI Kit is a meticulously crafted set of components and screens designed specifically for the wellness industry. It focuses on accessibility, calm aesthetics, and intuitive user flows to enhance the meditation experience.',
    technologies: ['Figma', 'React Native', 'Styled Components'],
    role: 'UI/UX Designer',
    date: 'Aug 2023',
    link: '#',
    github: '#',
  },
  {
    title: 'Motion Graphics Showreel',
    category: 'Motion Graphics',
    image: 'https://picsum.photos/seed/project4/800/600',
    description: 'A collection of dynamic motion graphics and visual effects.',
    longDescription: 'This showreel highlights my expertise in motion design, featuring a variety of techniques from 2D character animation to complex 3D particle systems. Each piece demonstrates a strong sense of timing, rhythm, and visual storytelling.',
    technologies: ['After Effects', 'Cinema 4D', 'Premiere Pro'],
    role: 'Motion Designer',
    date: 'May 2023',
    link: '#',
    github: '#',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState(localProjects);
  const [selectedProject, setSelectedProject] = useState<typeof localProjects[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedProjects = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        setProjects(fetchedProjects);
        
        const uniqueCategories = ['All', ...new Set(fetchedProjects.map(p => p.category))];
        setCategories(uniqueCategories);
      } else {
        // Fallback to local data if Firestore is empty
        setProjects(localProjects);
        const uniqueCategories = ['All', ...new Set(localProjects.map(p => p.category))];
        setCategories(uniqueCategories);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return () => unsubscribe();
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleOpenDetails = (project: typeof localProjects[0]) => {
    playSound('click');
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetails = () => {
    playSound('click');
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleFilterChange = (category: string) => {
    playSound('hover');
    setActiveFilter(category);
  };

  return (
    <section id="projects" className="py-24 md:py-48 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Selected Works</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A collection of projects that showcase my design philosophy and technical capabilities.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleFilterChange(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeFilter === category 
                  ? 'bg-foreground text-background border-foreground shadow-[0_0_20px_rgba(255,99,33,0.3)]' 
                  : 'glass border-foreground/10 hover:border-foreground/30'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          ref={ref} 
          layout
          className="grid md:grid-cols-2 gap-12 md:gap-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index} 
                isInView={isInView} 
                onOpenDetails={handleOpenDetails} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseDetails}
                className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] glass border border-foreground/10 flex flex-col md:flex-row"
              >
                <button
                  onClick={handleCloseDetails}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FF6321] mb-2 block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <Info size={14} /> Overview
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                          <User size={14} /> Role
                        </h4>
                        <p className="font-medium">{selectedProject.role}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                          <Calendar size={14} /> Date
                        </h4>
                        <p className="font-medium">{selectedProject.date}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <Code size={14} /> Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full bg-foreground/5 text-[10px] font-bold uppercase tracking-widest">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <motion.a
                        href={selectedProject.link}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-6 py-4 rounded-2xl bg-foreground text-background font-bold uppercase tracking-widest text-center text-xs flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </motion.a>
                      <motion.a
                        href={selectedProject.github}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-6 py-4 rounded-2xl glass font-bold uppercase tracking-widest text-center text-xs flex items-center justify-center gap-2"
                      >
                        <Github size={16} /> Source Code
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isInView, onOpenDetails }: { 
  project: typeof localProjects[0], 
  index: number, 
  isInView: boolean,
  onOpenDetails: (p: typeof localProjects[0]) => void 
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const imgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const imgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ 
        duration: 1, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative flex flex-col gap-6 cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative aspect-[4/3] overflow-hidden rounded-3xl glass shadow-2xl"
      >
        <motion.img
          src={project.image}
          alt={project.title}
          style={{
            x: imgX,
            y: imgY,
          }}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
          whileHover={{ scale: 1.2 }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-6">
          <div className="flex gap-6" style={{ transform: "translateZ(30px)" }}>
            <motion.a
              href={project.link}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => playSound('hover')}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"
            >
              <ExternalLink size={20} />
            </motion.a>
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => playSound('hover')}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"
            >
              <Github size={20} />
            </motion.a>
          </div>
          <motion.button
            onClick={() => onOpenDetails(project)}
            style={{ transform: "translateZ(40px)" }}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "#FF6321",
              boxShadow: "0 0 30px rgba(255, 99, 33, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => playSound('hover')}
            className="px-8 py-3 rounded-full glass text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 border border-white/20"
          >
            <Info size={16} />
            View Details
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col gap-2" style={{ transform: "translateZ(20px)" }}>
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
}
